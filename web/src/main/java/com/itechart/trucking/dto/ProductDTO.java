package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDTO extends AbstractDTO {
    private String name;
    private ProductStateDTO productState;
    private Integer amount;
    private String state;
    private Long invoiceId;
}
