package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CarTypeDTO;
import com.itechart.trucking.entity.CarType;

public class CarTypeConverter extends AbstractTwoWayConverter<CarTypeDTO, CarType> {
    @Override
    protected CarType convert(CarTypeDTO dto) {
        CarType productState = new CarType();
        productState.setId(dto.getId());
        productState.setDescription(dto.getDescription());
        return productState;
    }

    @Override
    protected CarTypeDTO convertBack(CarType entity) {
        CarTypeDTO dto = new CarTypeDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
