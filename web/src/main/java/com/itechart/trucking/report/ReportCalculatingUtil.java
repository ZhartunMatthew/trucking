package com.itechart.trucking.report;

import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import com.itechart.trucking.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportCalculatingUtil {

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private CustomerCompanyService customerCompanyService;

    @Autowired
    private ProductService productService;

    @Autowired
    private WaybillService waybillService;

    private ReportInfo reportInfo;
    private Long truckingCompanyId;

    public ReportInfo calculate(Long truckingCompanyId) {
        reportInfo = new ReportInfo();
        this.truckingCompanyId = truckingCompanyId;
        calculateResourceAmount();
        calculateProduct();
        calculateWaybill();
        calculateRevenue();
        return reportInfo;
    }

    private void calculateResourceAmount() {
        reportInfo.setCarsAmount(carService.count(truckingCompanyId));
        reportInfo.setEmployeesAmount(userService.count(truckingCompanyId));
        reportInfo.setInvoiceAmount(invoiceService.count(truckingCompanyId));
        reportInfo.setCustomersAmount(customerCompanyService.count(truckingCompanyId));
    }

    private void calculateProduct() {
        List<Product> lostList = productService.findAllByState(ProductStateEnum.LOST, truckingCompanyId);
        long lost = 0;
        long delivered = 0;
        for (Product product: lostList) {
            lost += product.getLostAmount();
            delivered += product.getAmount() - product.getLostAmount();
        }
        List<Product> deliveredList = productService.findAllByState(ProductStateEnum.DELIVERED, truckingCompanyId);
        for (Product product: deliveredList) {
            delivered += product.getAmount();
        }
        reportInfo.setProductLost(lost);
        reportInfo.setProductDelivered(delivered);
        reportInfo.setProductsSum(lost + delivered);
        double percent = 0;
        if (lost + delivered != 0) {
            percent = (double) 100 * lost / (lost + delivered);
        }
        reportInfo.setProductLostPercent(percent);
        double productLostPrice = 0;
        List<Product> productList = productService.FindAll(truckingCompanyId);
        for (Product product: productList) {
            if (product.getProductState() == ProductStateEnum.LOST)
                productLostPrice += product.getPrice() * product.getLostAmount();
        }
        reportInfo.setProductLostPrice(productLostPrice);
    }

    private void calculateWaybill() {
        List<Waybill> waybillList = waybillService.findByTruckingCompany(truckingCompanyId);
        double count = waybillList.size();
        double distance = 0;
        double fuelCost = 0;
        double price = 0;
        for (Waybill waybill: waybillList) {
            distance += waybill.getTotalDistance();
            fuelCost += waybill.getTotalDistance() * waybill.getInvoice().getCar().getFuelConsumption() * 0.5;
            price += waybill.getPrice();
        }
        if (count != 0) {
            reportInfo.setAvgDistance(distance / count);
            reportInfo.setAvgInvoiceRevenue(price / count);
        } else {
            reportInfo.setAvgDistance(0);
            reportInfo.setAvgInvoiceRevenue(0);
        }
        reportInfo.setTotalDistance(distance);
        reportInfo.setFuelPrice(fuelCost);

        reportInfo.setTotalInvoiceRevenue(price);
    }

    public void calculateRevenue() {
        double income = reportInfo.getTotalInvoiceRevenue();
        double outcome = reportInfo.getProductLostPrice() + reportInfo.getFuelPrice();
        reportInfo.setIncome(income);
        reportInfo.setOutcome(outcome);
        reportInfo.setRevenue(income - outcome);
    }
}
