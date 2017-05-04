package com.itechart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CarDTO extends AbstractDTO {
    private String number;
    private String brand;
    private String model;
    private Double fuelConsumption;
    private String type;
    private Boolean isAvailable;
}
