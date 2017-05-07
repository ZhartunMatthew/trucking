package com.itechart.trucking.controller;

import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping(value = "/api/waybill")
public class WaybillController {

    @Autowired
    private WaybillService waybillService;

    @Autowired
    private ConversionService conversionService;


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<WaybillDTO> getById(@PathVariable Long id) {
        UserRoleEnum userRole = CustomUserDetailsProvider.getUserDetails().getRole();
        WaybillDTO waybillDTO = conversionService.convert(waybillService.findOne(id), WaybillDTO.class);
        Long idTruckingCompany = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        if(idTruckingCompany == waybillDTO.getIdTruckingCompany() && userRole.equals(UserRoleEnum.MANAGER) || userRole.equals(UserRoleEnum.DRIVER) || userRole.equals(UserRoleEnum.COMPANY_OWNER)){
            return new ResponseEntity<>(waybillDTO, HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/waybills", method = RequestMethod.GET)
    public ResponseEntity<List<WaybillDTO>> findAll() {
        UserRoleEnum userRole = CustomUserDetailsProvider.getUserDetails().getRole();
        if(userRole.equals(UserRoleEnum.MANAGER) || userRole.equals(UserRoleEnum.COMPANY_OWNER)) {
            Long idTruckingCompany = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
            List<Waybill> waybills = waybillService.findByInvoice_TruckingCompany(idTruckingCompany);
            List<WaybillDTO> waybillDTOs = new ArrayList<>();
            for (Waybill waybill : waybills) {
                WaybillDTO waybillDTO = conversionService.convert(waybill, WaybillDTO.class);
                waybillDTOs.add(waybillDTO);
            }
            return new ResponseEntity<>(waybillDTOs, HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<WaybillDTO> create(@RequestBody WaybillDTO waybillDTO) {
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity,WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill,HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<WaybillDTO> update(@RequestBody WaybillDTO waybillDTO) {
        Waybill waybillEntity = waybillService.save(conversionService.convert(waybillDTO, Waybill.class));
        WaybillDTO resultWaybill = conversionService.convert(waybillEntity,WaybillDTO.class);
        return new ResponseEntity<>(resultWaybill,HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        waybillService.delete(id);
    }

}
