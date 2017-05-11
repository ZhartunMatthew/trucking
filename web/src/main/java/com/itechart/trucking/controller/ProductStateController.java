package com.itechart.trucking.controller;

import com.itechart.trucking.dto.ProductStateDTO;
import com.itechart.trucking.services.ProductStateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/product_state")
public class ProductStateController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductStateController.class);

    @Autowired
    private ProductStateService productStateService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductStateDTO>> getAll() {
        LOGGER.info("REST request. Path:/api/product_state  method: GET");
        List<ProductStateDTO> dtos = new LinkedList<>();
        productStateService.findAll().forEach(entity ->
                dtos.add(conversionService.convert(entity, ProductStateDTO.class)));
        LOGGER.info("Return productStateList.size:{}", dtos.size());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
