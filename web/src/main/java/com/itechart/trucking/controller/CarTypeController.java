package com.itechart.trucking.controller;

import com.itechart.trucking.entity.enums.CarTypeEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/api/car-type")
public class CarTypeController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CarTypeController.class);

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List> findAll() {
        LOGGER.info("REST request. Path:/api/car-type  method: GET");
        List carTypes = Arrays.asList(CarTypeEnum.values());
        LOGGER.info("Return carTypeList.size={}", carTypes.size());
        return new ResponseEntity<>(carTypes, HttpStatus.OK);
    }
}
