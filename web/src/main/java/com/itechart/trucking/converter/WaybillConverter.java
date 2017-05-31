package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CheckPointDTO;
import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class WaybillConverter extends AbstractTwoWayConverter<WaybillDTO, Waybill> {

    @Autowired
    private CheckPointConverter checkPointConverter;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    protected Waybill convert(WaybillDTO dto) {
        Waybill entity = new Waybill();
        entity.setId(dto.getId());
        entity.setWaybillNumber(dto.getWaybillNumber());
        entity.setDepartureDate(dto.getDepartureDate());
        entity.setDepartureCountry(dto.getDepartureCountry());
        entity.setDepartureCity(dto.getDepartureCity());
        entity.setDepartureStreet(dto.getDepartureStreet());
        entity.setDepartureHouse(dto.getDepartureHouse());
        entity.setDepartureLatitude(dto.getDepartureLatitude());
        entity.setDepartureLongitude(dto.getDepartureLongitude());
        entity.setDestinationDate(dto.getDestinationDate());
        entity.setDestinationCountry(dto.getDestinationCountry());
        entity.setDestinationCity(dto.getDestinationCity());
        entity.setDestinationStreet(dto.getDestinationStreet());
        entity.setDestinationHouse(dto.getDestinationHouse());
        entity.setDestinationLatitude(dto.getDestinationLatitude());
        entity.setDestinationLongitude(dto.getDestinationLongitude());
        entity.setPrice(dto.getPrice());
        entity.setTotalDistance(dto.getTotalDistance());
        entity.setWaybillState(dto.getWaybillState());
        entity.setInvoice(invoiceService.findOne(dto.getInvoiceId()));
        List<CheckPoint> checkPointList = new ArrayList<>();
        for (CheckPointDTO checkPointDTO : dto.getCheckPoints()) {
            CheckPoint checkPoint = checkPointConverter.convert(checkPointDTO);
            checkPoint.setWaybill(entity);
            checkPointList.add(checkPoint);
        }
        entity.setCheckPoints(checkPointList);
        return entity;
    }

    @Override
    protected WaybillDTO convertBack(Waybill entity) {
        WaybillDTO dto = new WaybillDTO();
        dto.setId(entity.getId());
        dto.setWaybillNumber(entity.getWaybillNumber());
        dto.setDepartureDate(entity.getDepartureDate());
        dto.setDepartureCountry(entity.getDepartureCountry());
        dto.setDepartureCity(entity.getDepartureCity());
        dto.setDepartureStreet(entity.getDepartureStreet());
        dto.setDepartureHouse(entity.getDepartureHouse());
        dto.setDepartureLatitude(entity.getDepartureLatitude());
        dto.setDepartureLongitude(entity.getDepartureLongitude());
        dto.setDestinationDate(entity.getDestinationDate());
        dto.setDestinationCountry(entity.getDestinationCountry());
        dto.setDestinationCity(entity.getDestinationCity());
        dto.setDestinationStreet(entity.getDestinationStreet());
        dto.setDestinationHouse(entity.getDestinationHouse());
        dto.setDestinationLatitude(entity.getDestinationLatitude());
        dto.setDestinationLongitude(entity.getDestinationLongitude());
        dto.setPrice(entity.getPrice());
        dto.setTotalDistance(entity.getTotalDistance());
        dto.setWaybillState(entity.getWaybillState());
        dto.setInvoiceId(entity.getInvoice().getId());
        dto.setInvoiceNumber(entity.getInvoice().getInvoiceNumber());
        dto.setInvoiceDate(entity.getInvoice().getRegisterDate());
        dto.setCustomerCompany(entity.getInvoice().getCustomerCompany().getName());
        dto.setDriverName(entity.getInvoice().getDriverUser().getName());
        dto.setDriverPatronymic(entity.getInvoice().getDriverUser().getPatronymic());
        dto.setDriverSurname(entity.getInvoice().getDriverUser().getSurname());
        dto.setIdTruckingCompany(entity.getInvoice().getTruckingCompany().getId());
        List<CheckPointDTO> checkPointDTOs = new ArrayList<>();
        for (CheckPoint checkPoint : entity.getCheckPoints()) {
            CheckPointDTO checkPointDTO = checkPointConverter.convertBack(checkPoint);
            checkPointDTO.setWaybillId(entity.getId());
            checkPointDTOs.add(checkPointDTO);
        }
        dto.setCheckPoints(checkPointDTOs);
        return dto;
    }
}
