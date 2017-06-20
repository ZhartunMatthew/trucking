package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashMap;

@Getter
@Setter
@ToString
public class HighchartsDTO {
    private HashMap<Long, Double> revenueByDate;
}
