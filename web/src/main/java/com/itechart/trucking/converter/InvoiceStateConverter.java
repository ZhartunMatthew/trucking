package com.itechart.trucking.converter;

import com.itechart.trucking.dto.InvoiceStateDTO;
import com.itechart.trucking.entity.InvoiceState;

public class InvoiceStateConverter extends AbstractTwoWayConverter<InvoiceStateDTO, InvoiceState> {
    @Override
    protected InvoiceState convert(InvoiceStateDTO dto) {
        InvoiceState productState = new InvoiceState();
        productState.setId(dto.getId());
        productState.setDescription(dto.getName());
        return productState;
    }

    @Override
    protected InvoiceStateDTO convertBack(InvoiceState entity) {
        InvoiceStateDTO dto = new InvoiceStateDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
