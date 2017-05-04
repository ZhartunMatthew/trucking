package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class WaybillDTO extends AbstractDTO {
    private String waybillNumber;
    private Date departureDate;
    private String departureCity;
    private String departureStreet;
    private String departureHouse;
    private String departureLatitude;
    private String departureLongitude;
    private Date destinationDate;
    private String destinationCity;
    private String destinationStreet;
    private String destinationHouse;
    private String destinationLatitude;
    private String destinationLongitude;
    private String waybillState;
    private String invoiceNumber;
    private Date invoiceDate;
    private String customerCompany;
    private String driverName;
    private String driverPatronymic;
    private String driverSurname;
}
