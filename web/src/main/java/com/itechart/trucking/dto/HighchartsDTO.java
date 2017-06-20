package com.itechart.trucking.dto;

import com.itechart.trucking.entity.enums.CarTypeEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;

@Getter
@Setter
@ToString
public class HighchartsDTO {
    private HashMap<Long, Double> revenueByDate;
    private HashMap<CarTypeEnum, Double> revenueByCarType;
}
