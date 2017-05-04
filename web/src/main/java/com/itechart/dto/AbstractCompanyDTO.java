package com.itechart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public abstract class AbstractCompanyDTO extends AbstractDTO {
    private String name;
    private String taxpayerNumber;
    private String country;
    private String city;
    private String street;
    private String house;
}
