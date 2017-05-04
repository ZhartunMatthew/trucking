package com.itechart.trucking.converter;

import com.itechart.trucking.dto.InvoiceDTO;
import com.itechart.trucking.entity.Invoice;

public class InvoiceConverter extends AbstractTwoWayConverter<InvoiceDTO, Invoice> {
    @Override
    protected Invoice convert(InvoiceDTO dto) {
        Invoice entity = new Invoice();
        entity.setId(dto.getId());
        entity.setRegisterDate(dto.getRegisterDate());
        entity.setCheckDate(dto.getCheckDate());
        return entity;
    }

    @Override
    protected InvoiceDTO convertBack(Invoice entity) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.setId(entity.getId());
        dto.setRegisterDate(entity.getRegisterDate());
        dto.setCheckDate(entity.getCheckDate());
        return dto;
    }
}
