package com.itechart.trucking.dto;

import com.itechart.trucking.entity.enums.CarTypeEnum;
import com.itechart.trucking.entity.enums.ProductLostEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
public class HighchartsDTO {
    private Map<Long, Double> revenueByDate;
    private Map<CarTypeEnum, Double> revenueByCarType;
    private Map<ProductLostEnum, Double> lostProductsByState;
}
