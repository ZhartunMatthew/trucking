package com.itechart.trucking.controller;

import com.itechart.trucking.dto.TruckingCompanyDTO;
import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.services.TruckingCompanyService;
import com.itechart.trucking.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(TruckingCompanyController.class);

    @Autowired
    private TruckingCompanyService service;

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<TruckingCompanyDTO> getById(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/trucking-company{}  method: GET", id);
        TruckingCompany company = service.findOne(id);
        TruckingCompanyDTO dto = conversionService.convert(company, TruckingCompanyDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<TruckingCompanyDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/trucking-company  method: GET");
        List<TruckingCompany> companies = service.findAll();
        List<TruckingCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, TruckingCompanyDTO.class))
        );
        LOGGER.info("Return truckingCompanyList.size:{}", companyDTOs.size());
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<TruckingCompanyDTO> create(@RequestBody TruckingCompanyDTO dto) {
        LOGGER.info("REST request. Path:/api/trucking-company  method: POST. company: {}", dto);
        if(service.findByTaxpayerNumber(dto.getTaxpayerNumber()).isPresent()) {
            return new ResponseEntity<>(dto, HttpStatus.CONFLICT);
        }
        TruckingCompany company = conversionService.convert(dto, TruckingCompany.class);
        TruckingCompanyDTO dtoFromDB = conversionService.convert(service.saveFullTruckingCompany(company), TruckingCompanyDTO.class);
        return new ResponseEntity<>(dtoFromDB, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<TruckingCompanyDTO> update(@PathVariable Long id,
                                                     @RequestBody TruckingCompanyDTO dtoForUpdate) {
        LOGGER.info("REST request. Path:/api/trucking-company/{}  method: PUT.  companyInfo: {}", id, dtoForUpdate);
        TruckingCompany currentCompany = service.findOne(id);
        if (currentCompany == null) {
            LOGGER.warn("Not found truckingCompany id: {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        TruckingCompany updatedCompany = service.save(conversionService.convert(dtoForUpdate, TruckingCompany.class));
        TruckingCompanyDTO updatedDTO = conversionService.convert(updatedCompany, TruckingCompanyDTO.class);
        LOGGER.info("Return updated truckingCompany: {}", updatedDTO);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }
}
