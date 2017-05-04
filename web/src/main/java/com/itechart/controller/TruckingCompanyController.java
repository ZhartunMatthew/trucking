package com.itechart.controller;

import com.itechart.entity.TruckingCompany;
import com.itechart.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/trucking_company/")
public class TruckingCompanyController {

    @Autowired
    private TruckingCompanyService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<TruckingCompany> getById(@PathVariable Long id) {
        TruckingCompany company = service.findOne(id);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<TruckingCompany>> findAll() {
        List<TruckingCompany> companies = service.findAll();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody TruckingCompany company) {
        service.save(company);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<TruckingCompany> update(@RequestBody TruckingCompany company) {
        service.save(company);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
