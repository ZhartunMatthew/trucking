package com.itechart.trucking.dto;

import com.itechart.trucking.entity.CarType;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class CarDTO extends AbstractDTO {
    private String number;
    private String brand;
    private String model;
    private Double fuelConsumption;
    private CarTypeDTO type;
    private Boolean isAvailable;
    private Long truckingCompanyId;
}
