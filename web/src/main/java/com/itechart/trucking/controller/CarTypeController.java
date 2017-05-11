package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CarTypeDTO;
import com.itechart.trucking.entity.CarType;
import com.itechart.trucking.services.CarTypeService;
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

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/car-type")
public class CarTypeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarTypeController.class);

    @Autowired
    private CarTypeService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CarTypeDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/car-type  method: GET");
        List<CarType> carTypes = service.findAll();
        List<CarTypeDTO> carTypeDTOs = new ArrayList<>();
        carTypes.forEach(carType ->
                carTypeDTOs.add(conversionService.convert(carType, CarTypeDTO.class))
        );
        LOGGER.info("Return carTypeList.size={}", carTypeDTOs.size());
        return new ResponseEntity<>(carTypeDTOs, HttpStatus.OK);
    }
}
