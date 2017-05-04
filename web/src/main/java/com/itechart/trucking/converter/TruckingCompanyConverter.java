package com.itechart.trucking.converter;

import com.itechart.trucking.dto.TruckingCompanyDTO;
import com.itechart.trucking.entity.TruckingCompany;

public class TruckingCompanyConverter extends AbstractTwoWayConverter<TruckingCompanyDTO, TruckingCompany> {
    @Override
    protected TruckingCompany convert(TruckingCompanyDTO dto) {
        TruckingCompany entity = new TruckingCompany();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setTaxpayerNumber(dto.getTaxpayerNumber());
        entity.setCountry(dto.getCountry());
        entity.setCity(dto.getCity());
        entity.setStreet(dto.getStreet());
        entity.setHouse(dto.getHouse());
        return entity;
    }

    @Override
    protected TruckingCompanyDTO convertBack(TruckingCompany entity) {
        TruckingCompanyDTO dto = new TruckingCompanyDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setTaxpayerNumber(entity.getTaxpayerNumber());
        dto.setCountry(entity.getCountry());
        dto.setCity(entity.getCity());
        dto.setStreet(dto.getStreet());
        dto.setHouse(dto.getHouse());
        return dto;
    }
}
