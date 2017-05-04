package com.itechart.trucking.converter;

import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.Product;

public class ProductConverter extends AbstractTwoWayConverter<ProductDTO, Product> {
    @Override
    protected Product convert(ProductDTO dto) {
        Product entity = new Product();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setAmount(dto.getAmount());
        return entity;
    }

    @Override
    protected ProductDTO convertBack(Product entity) {
        ProductDTO dto = new ProductDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAmount(entity.getAmount());
        dto.setState(entity.getProductState().getDescription());
        return dto;
    }
}
