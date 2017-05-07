package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CustomerCompanyDTO;
import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.services.CustomerCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/customer-company")
public class CustomerCompanyController {

    @Autowired
    private CustomerCompanyService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CustomerCompanyDTO> getById(@PathVariable Long id) {
        CustomerCompany company = service.findOne(id);
        CustomerCompanyDTO dto = conversionService.convert(company, CustomerCompanyDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CustomerCompanyDTO>> findAll() {
        List<CustomerCompany> companies = service.findAll();
        List<CustomerCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, CustomerCompanyDTO.class))
        );
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CustomerCompanyDTO>> findByName(@RequestParam(value = "name") String name) {
        List<CustomerCompany> companies = service.findByNameContaining(name);
        List<CustomerCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, CustomerCompanyDTO.class))
        );
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody CustomerCompanyDTO dto) {
        CustomerCompany company = conversionService.convert(dto, CustomerCompany.class);
        service.save(company);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CustomerCompanyDTO> update(@PathVariable Long id,
                                                     @RequestBody CustomerCompanyDTO dtoForUpdate) {
        CustomerCompany currentCompany = service.findOne(id);
        if (currentCompany == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CustomerCompany updatedCompany = service.save(conversionService.convert(dtoForUpdate, CustomerCompany.class));
        CustomerCompanyDTO updatedDTO = conversionService.convert(updatedCompany, CustomerCompanyDTO.class);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
