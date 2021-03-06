package com.itechart.trucking.dto;

import com.itechart.trucking.entity.enums.ProductLostEnum;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(callSuper = true)
public class ProductDTO extends AbstractDTO {
    private String name;
    private ProductStateEnum productState;
    private Integer amount;
    private Long invoiceId;
    private Integer lostAmount;
    private ProductLostEnum lostReason;
    private String lostDescription;
    private Double price;
}
