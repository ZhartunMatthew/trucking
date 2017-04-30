package com.itechart.controller;

import com.itechart.entity.AutoType;
import com.itechart.services.AutoTypeService;
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
public class AutoTypeController {
    @Autowired
    private AutoTypeService service;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<AutoType>> findAll() {
        List<AutoType> autoTypeList = service.findAll();
        return new ResponseEntity<>(autoTypeList, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<AutoType> getById(@PathVariable Long id) {
        AutoType autoType = service.findOne(id);
        return new ResponseEntity<>(autoType, HttpStatus.OK);
    }
}
