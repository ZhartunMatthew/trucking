package com.itechart.trucking.converter;

import com.itechart.trucking.dto.WaybillStateDTO;
import com.itechart.trucking.entity.WaybillState;
import org.springframework.stereotype.Component;

@Component
public class WaybillStateConverter extends AbstractTwoWayConverter<WaybillStateDTO, WaybillState> {

    @Override
    protected WaybillState convert(WaybillStateDTO dto) {
        WaybillState productState = new WaybillState();
        productState.setId(dto.getId());
        productState.setDescription(dto.getName());
        return productState;
    }

    @Override
    protected WaybillStateDTO convertBack(WaybillState entity) {
        WaybillStateDTO dto = new WaybillStateDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
