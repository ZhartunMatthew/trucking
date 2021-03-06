package com.itechart.trucking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.itechart.trucking.entity.enums.InvoiceStateEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
public class InvoiceDTO extends AbstractDTO {
    private String number;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date registerDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date checkDate;
    private InvoiceStateEnum invoiceState;
    private Long destinationCustomerCompanyId;
    private String destinationCustomerCompany;
    private Long customerCompanyId;
    private String customerCompany;
    private Long truckingCompanyId;
    private String truckingCompany;
    private Long driverId;
    private String driverFullName;
    private Long managerId;
    private Long dispatcherId;
    private Long carId;
    private List<ProductDTO> products;
}
