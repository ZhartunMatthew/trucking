package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CheckPointDTO;
import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CheckPointConverter extends AbstractTwoWayConverter<CheckPointDTO, CheckPoint> {

    @Autowired
    private WaybillService waybillService;

    @Override
    protected CheckPoint convert(CheckPointDTO dto) {
        CheckPoint entity = new CheckPoint();
        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        entity.setLatitude(dto.getLatitude());
        entity.setLongitude(dto.getLongitude());
        entity.setPathDate(dto.getPathDate());
        entity.setWaybill(waybillService.findOne(dto.getWaybillId()));
        return entity;
    }

    @Override
    protected CheckPointDTO convertBack(CheckPoint entity) {
        CheckPointDTO dto = new CheckPointDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        dto.setLatitude(entity.getLatitude());
        dto.setLongitude(entity.getLongitude());
        dto.setPathDate(entity.getPathDate());
        dto.setWaybillId(entity.getWaybill().getId());
        return dto;
    }
}
