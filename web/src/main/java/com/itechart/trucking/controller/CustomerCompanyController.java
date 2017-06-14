package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CustomerCompanyDTO;
import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.CustomerCompanyService;
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
@RequestMapping(value = "/api/customer-company")
public class CustomerCompanyController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerCompanyController.class);

    @Autowired
    private CustomerCompanyService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CustomerCompanyDTO> getById(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/customer-company{}  method: GET", id);
        CustomerCompany company = service.findOne(id);
        CustomerCompanyDTO dto = conversionService.convert(company, CustomerCompanyDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CustomerCompanyDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/customer-company  method: GET");
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        List<CustomerCompany> companies = service.findAll(truckingCompanyId);
        List<CustomerCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, CustomerCompanyDTO.class))
        );
        LOGGER.info("Return customerCompanyList.size:{}", companyDTOs.size());
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CustomerCompanyDTO>> findByName(@RequestParam(value = "name") String name) {
        LOGGER.info("REST request. Path:/api/customer-company/search  method: GET, companuName:{}", name);
        List<CustomerCompany> companies = service.findByNameContaining(name);
        List<CustomerCompanyDTO> companyDTOs = new ArrayList<>();
        companies.forEach(customerCompany ->
                companyDTOs.add(conversionService.convert(customerCompany, CustomerCompanyDTO.class))
        );
        LOGGER.info("Return customerCompanyList.size:{}", companyDTOs.size());
        return new ResponseEntity<>(companyDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<CustomerCompanyDTO> create(@RequestBody CustomerCompanyDTO dto) {
        LOGGER.info("REST request. Path:/api/customer-company  method: POST. company: {}", dto);
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        dto.setTruckingCompanyId(truckingCompanyId);
        CustomerCompany company = conversionService.convert(dto, CustomerCompany.class);
        CustomerCompanyDTO dtoFromDB = conversionService.convert(service.save(company), CustomerCompanyDTO.class);
        return new ResponseEntity<>(dtoFromDB, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CustomerCompanyDTO> update(@PathVariable Long id,
                                                     @RequestBody CustomerCompanyDTO dtoForUpdate) {
        LOGGER.info("REST request. Path:/api/customer-company/{}  method: PUT.  companyInfo: {}", id, dtoForUpdate);
        CustomerCompany currentCompany = service.findOne(id);
        if (currentCompany == null) {
            LOGGER.warn("Not found customerCompany id: {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CustomerCompany updatedCompany = service.save(conversionService.convert(dtoForUpdate, CustomerCompany.class));
        CustomerCompanyDTO updatedDTO = conversionService.convert(updatedCompany, CustomerCompanyDTO.class);
        LOGGER.info("Return updated customerCompany: {}", updatedDTO);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/customer-company/{}  method: DELETE.", id);
        service.delete(id);
    }
}
