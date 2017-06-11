package com.itechart.trucking.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString(callSuper = true)
public class WaybillDTO extends AbstractDTO {
    private String waybillNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date departureDate;
    private String departureCountry;
    private String departureCity;
    private String departureStreet;
    private String departureHouse;
    private String departureLatitude;
    private String departureLongitude;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date destinationDate;
    private String destinationCountry;
    private String destinationCity;
    private String destinationStreet;
    private String destinationHouse;
    private String destinationLatitude;
    private String destinationLongitude;
    private WaybillStateEnum waybillState;
    private Long invoiceId;
    private String invoiceNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date invoiceDate;
    private String customerCompany;
    private String driverFullName;
    private Long idTruckingCompany;
    private List<CheckPointDTO> checkPoints;
    private Double price;
    private Double totalDistance;
    private Integer allCheckPoints;
    private Integer passedCheckPoints;
}
