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
    private InvoiceStateDTO invoiceState;
    private Long customerCompanyId;
    private String customerCompany;
    private Long truckingCompanyId;
    private String truckingCompany;
    private Long driverId;
    private Long managerId;
    private Long dispatcherId;
    private Long carId;
    private List<ProductDTO> products;

}
