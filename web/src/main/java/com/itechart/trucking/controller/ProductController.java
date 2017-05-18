package com.itechart.trucking.controller;

import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/product")
public class ProductController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll(@RequestParam(value = "invoice_id") Long invoiceId) {
        List<ProductDTO> dtos = new LinkedList<>();
        productService.findAllByInvoiceId(invoiceId).forEach(entity ->
            dtos.add(conversionService.convert(entity, ProductDTO.class)));
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll(@RequestBody List<ProductDTO> products) {
        List<ProductDTO> dtos = new LinkedList<>();
        List<Product> tempList = new LinkedList<>();
        products.forEach(product -> tempList.add(productService.save(conversionService.convert(product, Product.class))));
        tempList.forEach(product -> dtos.add(conversionService.convert(product, ProductDTO.class)));
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}