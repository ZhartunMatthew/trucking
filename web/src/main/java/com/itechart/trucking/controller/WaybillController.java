package com.itechart.trucking.controller;

import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.UserRoleEnum;
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
import java.util.*;

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
        LOGGER.info("REST request. Path:/api/waybill/{} method: GET", id);
        UserRoleEnum userRole = CustomUserDetailsProvider.getUserDetails().getRole();
        WaybillDTO waybillDTO = conversionService.convert(waybillService.findOne(id), WaybillDTO.class);
        Long idTruckingCompany = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        if(idTruckingCompany == waybillDTO.getIdTruckingCompany() && userRole.equals(UserRoleEnum.MANAGER) || userRole.equals(UserRoleEnum.DRIVER) || userRole.equals(UserRoleEnum.COMPANY_OWNER)){
            LOGGER.info("Return waybill:{}", waybillDTO);
            return new ResponseEntity<>(waybillDTO, HttpStatus.OK);
        } else {
            LOGGER.warn("Permission denied for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<WaybillDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/waybill  method: GET");
        UserRoleEnum userRole = CustomUserDetailsProvider.getUserDetails().getRole();
        if(userRole.equals(UserRoleEnum.MANAGER) || userRole.equals(UserRoleEnum.COMPANY_OWNER)) {
            Long idTruckingCompany = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
            List<Waybill> waybills = waybillService.findByInvoice_TruckingCompany(idTruckingCompany);
            List<WaybillDTO> waybillDTOs = new ArrayList<>();
            for (Waybill waybill : waybills) {
                WaybillDTO waybillDTO = conversionService.convert(waybill, WaybillDTO.class);
                waybillDTOs.add(waybillDTO);
            }
            LOGGER.info("Return waybillList.size:{}", waybillDTOs.size());
            return new ResponseEntity<>(waybillDTOs, HttpStatus.OK);
        }
        else {
            LOGGER.warn("Permission denied for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<WaybillDTO> create(@RequestBody WaybillDTO waybillDTO) {
        LOGGER.info("REST request. Path:/api/waybill  method: POST. waybill: {}", waybillDTO);
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity,WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill,HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<WaybillDTO> update(@PathVariable Long id, @RequestBody WaybillDTO waybillDTO) {
        LOGGER.info("REST request. Path:/api/waybill/{}  method: PUT.  waybillInfo: {}", id, waybillDTO);
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity,WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill,HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/waybill/{}  method: DELETE.", id);
        waybillService.delete(id);
    }

}
