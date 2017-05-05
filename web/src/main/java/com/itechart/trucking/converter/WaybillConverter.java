package com.itechart.trucking.converter;

import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WaybillConverter extends AbstractTwoWayConverter<WaybillDTO, Waybill> {

    @Autowired
    private WaybillStateConverter waybillStateConverter;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    protected Waybill convert(WaybillDTO dto) {
        Waybill entity = new Waybill();
        entity.setId(dto.getId());
        entity.setDepartureDate(dto.getDepartureDate());
        entity.setDepartureCity(dto.getDepartureCity());
        entity.setDepartureStreet(dto.getDepartureStreet());
        entity.setDepartureHouse(dto.getDepartureHouse());
        entity.setDepartureLatitude(dto.getDepartureLatitude());
        entity.setDepartureLongitude(dto.getDepartureLongitude());
        entity.setDestinationDate(dto.getDestinationDate());
        entity.setDestinationCity(dto.getDestinationCity());
        entity.setDestinationStreet(dto.getDestinationStreet());
        entity.setDestinationHouse(dto.getDestinationHouse());
        entity.setDestinationLatitude(dto.getDestinationLatitude());
        entity.setDepartureLongitude(dto.getDestinationLongitude());
        entity.setWaybillState(waybillStateConverter.convert(dto.getWaybillState()));
        entity.setInvoice(invoiceService.findOne(dto.getInvoiceId()));
        return entity;
    }

    @Override
    protected WaybillDTO convertBack(Waybill entity) {
        WaybillDTO dto = new WaybillDTO();
        dto.setId(entity.getId());
        dto.setDepartureDate(entity.getDepartureDate());
        dto.setDepartureCity(entity.getDepartureCity());
        dto.setDepartureStreet(entity.getDepartureStreet());
        dto.setDepartureHouse(entity.getDepartureHouse());
        dto.setDepartureLatitude(entity.getDepartureLatitude());
        dto.setDepartureLongitude(entity.getDepartureLongitude());
        dto.setDestinationDate(entity.getDestinationDate());
        dto.setDestinationCity(entity.getDestinationCity());
        dto.setDestinationStreet(entity.getDestinationStreet());
        dto.setDestinationHouse(entity.getDestinationHouse());
        dto.setDestinationLatitude(entity.getDestinationLatitude());
        dto.setDepartureLongitude(entity.getDestinationLongitude());
        dto.setWaybillState(waybillStateConverter.convertBack(entity.getWaybillState()));
        dto.setInvoiceId(entity.getWaybillState().getId());
        return dto;
    }
}
