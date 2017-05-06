package com.itechart.trucking.converter;

import com.itechart.trucking.dto.InvoiceStateDTO;
import com.itechart.trucking.entity.InvoiceState;
import org.springframework.stereotype.Component;

@Component
public class InvoiceStateConverter extends AbstractTwoWayConverter<InvoiceStateDTO, InvoiceState> {

    @Override
    protected InvoiceState convert(InvoiceStateDTO dto) {
        InvoiceState entity = new InvoiceState();
        entity.setId(dto.getId());
        entity.setDescription(dto.getName());
        return entity;
    }

    @Override
    protected InvoiceStateDTO convertBack(InvoiceState entity) {
        InvoiceStateDTO dto = new InvoiceStateDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
