
package com.itechart.trucking.converter;

import com.itechart.trucking.dto.CarTypeDTO;
import com.itechart.trucking.entity.CarType;
import org.springframework.stereotype.Component;

@Component
public class CarTypeConverter extends AbstractTwoWayConverter<CarTypeDTO, CarType> {

    @Override
    protected CarType convert(CarTypeDTO dto) {
        CarType entity = new CarType();
        entity.setId(dto.getId());
        entity.setDescription(dto.getDescription());
        return entity;
    }

    @Override
    protected CarTypeDTO convertBack(CarType entity) {
        CarTypeDTO dto = new CarTypeDTO();
        dto.setId(entity.getId());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}

