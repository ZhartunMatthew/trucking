package com.itechart.trucking.converter;

import com.itechart.trucking.dto.ProductStateDTO;
import com.itechart.trucking.entity.ProductState;
import org.springframework.stereotype.Component;

@Component
public class ProductStateConverter extends AbstractTwoWayConverter<ProductStateDTO, ProductState> {
    @Override
    protected ProductState convert(ProductStateDTO dto) {
        ProductState productState = new ProductState();
        productState.setId(dto.getId());
        productState.setDescription(dto.getName());
        return productState;
    }

    @Override
    protected ProductStateDTO convertBack(ProductState entity) {
        ProductStateDTO dto = new ProductStateDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
