package com.itechart.trucking.controller;

import com.itechart.trucking.entity.CarType;
import com.itechart.trucking.services.CarTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/auto_type/")
public class CarTypeController {
    @Autowired
    private CarTypeService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<CarType>> findAll() {
        List<CarType> carTypeList = service.findAll();
        return new ResponseEntity<>(carTypeList, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<CarType> getById(@PathVariable Long id) {
        CarType carType = service.findOne(id);
        return new ResponseEntity<>(carType, HttpStatus.OK);
    }
}
