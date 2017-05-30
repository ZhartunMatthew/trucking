package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CarDTO;
import com.itechart.trucking.entity.Car;
import com.itechart.trucking.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CarConverter extends AbstractTwoWayConverter<CarDTO, Car> {

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    @Override
    protected Car convert(CarDTO dto) {
        Car entity = new Car();
        entity.setId(dto.getId());
        entity.setNumber(dto.getNumber());
        entity.setBrand(dto.getBrand());
        entity.setModel(dto.getModel());
        entity.setFuelConsumption(dto.getFuelConsumption());
        entity.setAvailable(dto.getIsAvailable());
        entity.setCarType(dto.getType());
        entity.setTruckingCompany(truckingCompanyService.findOne(dto.getTruckingCompanyId()));
        return entity;
    }

    @Override
    protected CarDTO convertBack(Car entity) {
        CarDTO dto = new CarDTO();
        dto.setId(entity.getId());
        dto.setNumber(entity.getNumber());
        dto.setBrand(entity.getBrand());
        dto.setModel(entity.getModel());
        dto.setFuelConsumption(entity.getFuelConsumption());
        dto.setIsAvailable(entity.getAvailable());
        dto.setType(entity.getCarType());
        dto.setTruckingCompanyId(entity.getTruckingCompany().getId());
        return dto;
    }
}
