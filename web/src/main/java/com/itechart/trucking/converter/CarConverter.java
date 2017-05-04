package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CarDTO;
import com.itechart.trucking.entity.Car;

public class CarConverter extends AbstractTwoWayConverter<CarDTO, Car> {
    @Override
    protected Car convert(CarDTO dto) {
        Car entity = new Car();
        entity.setId(dto.getId());
        entity.setNumber(dto.getNumber());
        entity.setBrand(dto.getBrand());
        entity.setModel(dto.getModel());
        entity.setFuelConsumption(dto.getFuelConsumption());
        entity.setAvailable(dto.getIsAvailable());
        return entity;
    }

    @Override
    protected CarDTO convertBack(Car entity) {
        CarDTO dto = new CarDTO();
        dto.setId(dto.getId());
        dto.setNumber(dto.getNumber());
        dto.setBrand(dto.getBrand());
        dto.setModel(dto.getModel());
        dto.setFuelConsumption(dto.getFuelConsumption());
        dto.setIsAvailable(dto.getIsAvailable());
        return dto;
    }
}
