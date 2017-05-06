package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public abstract class AbstractCompanyDTO extends AbstractDTO {
    protected String name;
    protected String taxpayerNumber;
    protected String country;
    protected String city;
    protected String street;
    protected String house;
}
