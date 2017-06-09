package com.itechart.trucking.controller;

import com.itechart.trucking.dto.InvoiceDTO;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.enums.InvoiceStateEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.InvoiceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(InvoiceController.class);

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<InvoiceDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/invoice  method: GET");
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<InvoiceDTO> dtos = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        invoiceService.findByTruckingCompanyId(trId).forEach(entity ->
                dtos.add(conversionService.convert(entity, InvoiceDTO.class)));
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> findOne(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/invoice/{} method: GET", id);
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long trId = details.getTruckingCompanyId();
        InvoiceDTO dto = conversionService.convert(
                invoiceService.findByIdAndTruckingCompanyId(id, trId), InvoiceDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> update(@PathVariable Long id,
                                             @RequestBody InvoiceDTO dtoForUpdate) {
        LOGGER.info("REST request. Path:/api/invoice/{}  method: PUT.  invoice: {}", id, dtoForUpdate);
        Invoice invoice = invoiceService.findOne(id);
        if (invoice == null) {
            LOGGER.warn("Not found invoice id: {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        dtoForUpdate.setManagerId(details.getId());
        dtoForUpdate.setCheckDate(new Date());
        Invoice updatedInvoice = invoiceService.save(conversionService.convert(dtoForUpdate, Invoice.class));
        InvoiceDTO updatedDTO = conversionService.convert(updatedInvoice, InvoiceDTO.class);
        LOGGER.info("Return updated invoice: {}", updatedDTO);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<InvoiceDTO> create(@RequestBody InvoiceDTO dto) {
        LOGGER.info("REST request. Path:/api/invoice  method: POST. invoice: {}", dto);
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long trId = details.getTruckingCompanyId();
        dto.setTruckingCompanyId(trId);
        dto.setRegisterDate(new Date());
        dto.setDispatcherId(details.getId());
        dto.setInvoiceState(InvoiceStateEnum.ISSUED);
        if(dto.getDriverId() == null) {
            dto.setDriverId(5L);
            LOGGER.info("DRIVER IS NULL");
        }
        Invoice invoiceFromDB = invoiceService.save(conversionService.convert(dto, Invoice.class));
        return new ResponseEntity<>(conversionService.convert(invoiceFromDB, InvoiceDTO.class), HttpStatus.OK);
    }

}