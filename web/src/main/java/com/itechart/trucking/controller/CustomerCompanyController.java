package com.itechart.trucking.controller;

import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.services.CustomerCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/customer_company/")
public class CustomerCompanyController {
    @Autowired
    private CustomerCompanyService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<CustomerCompany> getById(@PathVariable Long id) {
        CustomerCompany company = service.findOne(id);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<CustomerCompany>> findAll() {
        List<CustomerCompany> companies = service.findAll();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody CustomerCompany company) {
        service.save(company);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<CustomerCompany> update(@RequestBody CustomerCompany company) {
        service.save(company);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
