package com.itechart.trucking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString(callSuper = true)
public class WaybillDTO extends AbstractDTO {
    private String waybillNumber;
    private Date departureDate;
    private String departureCity;
    private String departureStreet;
    private String departureHouse;
    private String departureLatitude;
    private String departureLongitude;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date destinationDate;
    private String destinationCity;
    private String destinationStreet;
    private String destinationHouse;
    private String destinationLatitude;
    private String destinationLongitude;
    private WaybillStateDTO waybillState;
    private Long invoiceId;
    private String invoiceNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date invoiceDate;
    private String customerCompany;
    private String driverName;
    private String driverPatronymic;
    private String driverSurname;
    private Long idTruckingCompany;
}
