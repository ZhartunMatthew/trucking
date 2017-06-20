package com.itechart.trucking.charts;

import com.itechart.trucking.dto.HighchartsDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.CarTypeEnum;
import com.itechart.trucking.entity.enums.ProductLostEnum;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import com.itechart.trucking.services.ProductService;
import com.itechart.trucking.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
public class HighchartsUtil {

    @Autowired
    private WaybillService waybillService;

    @Autowired
    private ProductService productService;

    private HighchartsDTO dto;

    public HighchartsDTO calculate(Long truckingCompanyId) {
        dto = new HighchartsDTO();
        dto.setRevenueByDate(new HashMap<>());
        dto.setRevenueByCarType(new HashMap<>());
        dto.setLostProductsByState(new HashMap<>());
        List<Waybill> waybills = waybillService.findAllByState(WaybillStateEnum.TRANSPORTATION_COMPLETED,
                truckingCompanyId);
        calculateRevenueByDate(waybills);
        calculateRevenueByCarType(waybills);
        calculateLostProductsByState(truckingCompanyId);
        return dto;
    }

    private void calculateRevenueByDate(List<Waybill> waybills) {
        for (Waybill waybill : waybills) {
            Long key = waybill.getDestinationDate().getTime();
            if (dto.getRevenueByDate().containsKey(key)) {
                Double revenue = dto.getRevenueByDate().get(key);
                revenue += calculateWaybillRevenue(waybill);
                dto.getRevenueByDate().put(key, revenue);
            } else {
                dto.getRevenueByDate().put(key, calculateWaybillRevenue(waybill));
            }
        }
    }

    private void calculateRevenueByCarType(List<Waybill> waybills) {
        for (Waybill waybill : waybills) {
            CarTypeEnum key = waybill.getInvoice().getCar().getCarType();
            Double currentWaybillRevenue = calculateWaybillRevenue(waybill);
            if (dto.getRevenueByCarType().containsKey(key)) {
                Double revenue = dto.getRevenueByCarType().get(key);
                revenue += currentWaybillRevenue;
                dto.getRevenueByCarType().put(key, revenue);
            } else {
                dto.getRevenueByCarType().put(key, currentWaybillRevenue);
            }
        }
    }

    private Double calculateWaybillRevenue(Waybill waybill) {
        Double fuelCost = waybill.getTotalDistance() * waybill.getInvoice().getCar().getFuelConsumption() * 0.5;
        Double price = waybill.getPrice();
        Double lostProductsPrice = 0d;
        List<Product> products = waybill.getInvoice().getProducts();
        for (Product product : products) {
            if (product.getProductState() == ProductStateEnum.LOST) {
                lostProductsPrice += product.getPrice();
            }
        }
        return price - fuelCost - lostProductsPrice;
    }

    private void calculateLostProductsByState(Long truckingCompanyId) {
        List<Product> products = productService.findAllByState(ProductStateEnum.LOST, truckingCompanyId);
        for (Product product : products) {
            ProductLostEnum key = product.getLostReason();
            if (dto.getLostProductsByState().containsKey(key)) {
                Double price = dto.getLostProductsByState().get(key);
                price += product.getPrice();
                dto.getLostProductsByState().put(key, price);
            } else {
                dto.getLostProductsByState().put(key, product.getPrice());
            }
        }
    }
}
