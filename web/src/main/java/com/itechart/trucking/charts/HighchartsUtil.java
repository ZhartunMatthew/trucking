package com.itechart.trucking.charts;

import com.itechart.trucking.dto.HighchartsDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import com.itechart.trucking.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Component
public class HighchartsUtil {

    @Autowired
    private WaybillService waybillService;

    private HighchartsDTO dto;
    private Long truckingCompanyId;

    public HighchartsDTO calculate(Long truckingCompanyId) {
        dto = new HighchartsDTO();
        dto.setRevenueByDate(new HashMap<>());
        this.truckingCompanyId = truckingCompanyId;
        calculateRevenueByDate();
        return dto;
    }

    private void calculateRevenueByDate() {
        List<Waybill> waybills = waybillService.findAllByState(WaybillStateEnum.TRANSPORTATION_COMPLETED,
                truckingCompanyId);
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
}
