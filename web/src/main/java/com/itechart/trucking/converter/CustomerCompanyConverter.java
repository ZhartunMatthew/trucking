package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CustomerCompanyDTO;
import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerCompanyConverter extends AbstractTwoWayConverter<CustomerCompanyDTO, CustomerCompany> {

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    @Override
    protected CustomerCompany convert(CustomerCompanyDTO dto) {
        CustomerCompany entity = new CustomerCompany();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setTaxpayerNumber(dto.getTaxpayerNumber());
        entity.setCountry(dto.getCountry());
        entity.setCity(dto.getCity());
        entity.setStreet(dto.getStreet());
        entity.setHouse(dto.getHouse());
        entity.setTruckingCompany(truckingCompanyService.findOne(dto.getTruckingCompanyId()));
        return entity;
    }

    @Override
    protected CustomerCompanyDTO convertBack(CustomerCompany entity) {
        CustomerCompanyDTO dto = new CustomerCompanyDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setTaxpayerNumber(entity.getTaxpayerNumber());
        dto.setCountry(entity.getCountry());
        dto.setCity(entity.getCity());
        dto.setStreet(entity.getStreet());
        dto.setHouse(entity.getHouse());
        dto.setTruckingCompanyId(entity.getTruckingCompany().getId());
        return dto;
    }
}
