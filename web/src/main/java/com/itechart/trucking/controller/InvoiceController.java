package com.itechart.trucking.controller;


import com.itechart.trucking.dto.InvoiceDTO;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<InvoiceDTO>> findAll() {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<InvoiceDTO> dtos = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.ADMIN || role == UserRoleEnum.DISPATCHER || role == UserRoleEnum.MANAGER) {
            invoiceService.findByTruckingCompanyId(trId).forEach(entity ->
                    dtos.add(conversionService.convert(entity, InvoiceDTO.class)));
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> findOne(@PathVariable Long id) {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.ADMIN || role == UserRoleEnum.DISPATCHER || role == UserRoleEnum.MANAGER) {
            InvoiceDTO dto = conversionService.convert(
                    invoiceService.findByIdAndTruckingCompanyId(id, trId), InvoiceDTO.class);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> update(@PathVariable Long id, @RequestBody InvoiceDTO dto) {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.ADMIN || role == UserRoleEnum.DISPATCHER || role == UserRoleEnum.MANAGER) {
            Invoice invoice = invoiceService.findByIdAndTruckingCompanyId(id, trId);
            if(invoice == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Invoice invoiceFromDB = invoiceService.save(conversionService.convert(dto, Invoice.class));
            return new ResponseEntity<>(conversionService.convert(invoiceFromDB, InvoiceDTO.class), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> create(@RequestBody InvoiceDTO dto) {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else if(role == UserRoleEnum.DISPATCHER) {
            dto.setTruckingCompanyId(trId);
            dto.setRegisterDate(new Date());
            dto.setDispatcherId(details.getId());
            Invoice invoiceFromDB = invoiceService.save(conversionService.convert(dto, Invoice.class));
            return new ResponseEntity<>(conversionService.convert(invoiceFromDB, InvoiceDTO.class), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}