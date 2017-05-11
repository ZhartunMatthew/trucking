package com.itechart.trucking.controller;

import com.itechart.trucking.dto.TruckingCompanyDTO;
import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/trucking-company")
public class TruckingCompanyController {

    @Autowired
    private TruckingCompanyService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<TruckingCompanyDTO> getById(@PathVariable Long id) {
        TruckingCompany company = service.findOne(id);
        TruckingCompanyDTO dto = conversionService.convert(company, TruckingCompanyDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<TruckingCompanyDTO>> findAll() {
        List<TruckingCompany> companies = service.findAll();
        List<TruckingCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, TruckingCompanyDTO.class))
        );
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TruckingCompanyDTO> create(@RequestBody TruckingCompanyDTO dto) {
        TruckingCompany company = conversionService.convert(dto, TruckingCompany.class);
        TruckingCompanyDTO dtoFromDB = conversionService.convert(service.save(company), TruckingCompanyDTO.class);
        return new ResponseEntity<>(dtoFromDB, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<TruckingCompanyDTO> update(@PathVariable Long id, @RequestBody TruckingCompanyDTO dtoForUpdate) {
        TruckingCompany currentCompany = service.findOne(id);
        if (currentCompany == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        TruckingCompany updatedCompany = service.save(conversionService.convert(dtoForUpdate, TruckingCompany.class));
        TruckingCompanyDTO updatedDTO = conversionService.convert(updatedCompany, TruckingCompanyDTO.class);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }
}
