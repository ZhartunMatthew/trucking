package com.itechart.trucking.converter;

import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter extends AbstractTwoWayConverter<ProductDTO, Product> {

    @Autowired
    private InvoiceService invoiceService;

    @Override
    protected Product convert(ProductDTO dto) {
        Product entity = new Product();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setAmount(dto.getAmount());
        entity.setLost(dto.getLost());
        entity.setProductState(dto.getProductState());
        entity.setInvoice(invoiceService.findOne(dto.getInvoiceId()));
        return entity;
    }

    @Override
    protected ProductDTO convertBack(Product entity) {
        ProductDTO dto = new ProductDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setAmount(entity.getAmount());
        dto.setLost(entity.getLost());
        dto.setProductState(entity.getProductState());
        dto.setInvoiceId(entity.getInvoice().getId());
        return dto;
    }
}
