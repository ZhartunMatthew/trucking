package com.itechart.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDTO extends AbstractDTO {
    private String name;
    private Integer amount;
    private String state;
}
