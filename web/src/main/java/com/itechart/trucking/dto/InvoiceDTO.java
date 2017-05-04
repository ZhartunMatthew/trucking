package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class InvoiceDTO extends AbstractDTO {
    private String number;
    private Date registerDate;
    private Date checkDate;
    private String invoiceState;
    private String customerCompany;
    private String truckingCompany;
    private List<ProductDTO> products;

}
