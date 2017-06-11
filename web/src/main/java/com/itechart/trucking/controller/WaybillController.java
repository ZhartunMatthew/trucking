package com.itechart.trucking.controller;

import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.WaybillService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/api/waybill")
public class WaybillController {

    private static final Logger LOGGER = LoggerFactory.getLogger(WaybillController.class);

    @Autowired
    private WaybillService waybillService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<WaybillDTO> getById(@PathVariable Long id) {
        WaybillDTO waybillDTO = conversionService.convert(waybillService.findOne(id), WaybillDTO.class);
        return new ResponseEntity<>(waybillDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<WaybillDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/waybill  method: GET");
        Long idTruckingCompany = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        List<Waybill> waybills = waybillService.findByInvoice_TruckingCompany(idTruckingCompany);
        List<WaybillDTO> waybillDTOs = new ArrayList<>();
        for (Waybill waybill : waybills) {
            WaybillDTO waybillDTO = conversionService.convert(waybill, WaybillDTO.class);
            waybillDTOs.add(waybillDTO);
        }
        return new ResponseEntity<>(waybillDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/driver", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<WaybillDTO>> findAllForDriver() {
        Long idDriver = CustomUserDetailsProvider.getUserDetails().getId();
        List<Waybill> waybills = waybillService.findByInvoice_DriverUser(idDriver);
        List<WaybillDTO> waybillDTOs = new ArrayList<>();
        for (Waybill waybill : waybills) {
            WaybillDTO waybillDTO = conversionService.convert(waybill, WaybillDTO.class);
            waybillDTOs.add(waybillDTO);
        }
        return new ResponseEntity<>(waybillDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<WaybillDTO> create(@RequestBody WaybillDTO waybillDTO) {
        LOGGER.info("REST request. Path:/api/waybill  method: POST. waybill: {}", waybillDTO);
        waybillDTO.setDepartureDate(new Date());
        waybillDTO.setWaybillState(WaybillStateEnum.TRANSPORTATION_STARTED);
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity, WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<WaybillDTO> update(@PathVariable Long id, @RequestBody WaybillDTO waybillDTO) {
        LOGGER.info("REST request. Path:/api/waybill/{}  method: PUT.  waybillInfo: {}", id, waybillDTO);
        return updateWaybill(waybillDTO);
    }

    @RequestMapping(value = "/check", method = RequestMethod.PUT)
    public ResponseEntity<WaybillDTO> checkPassed(@RequestBody WaybillDTO waybillDTO) {
        LOGGER.info("REST request. Path:/api/waybill/check  method: PUT.  checkPointInfo: {}", waybillDTO);
        waybillDTO.setWaybillState(WaybillStateEnum.TRANSPORTATION_COMPLETED);
        waybillDTO.setDestinationDate(new Date());
        return updateWaybill(waybillDTO);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/waybill/{}  method: DELETE.", id);
        waybillService.delete(id);
    }

    private ResponseEntity<WaybillDTO> updateWaybill(WaybillDTO waybillDTO) {
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity, WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill, HttpStatus.OK);
    }
}
