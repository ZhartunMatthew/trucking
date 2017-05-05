package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerCompanyDTO extends AbstractCompanyDTO {
    private Long truckingCompanyId;
}
