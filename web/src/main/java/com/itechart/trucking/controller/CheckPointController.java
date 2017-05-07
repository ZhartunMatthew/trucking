package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CheckPointDTO;
import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.services.CheckPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/checkPoint")
public class CheckPointController {

    @Autowired
    private CheckPointService checkPointService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/one/{id}", method = RequestMethod.GET)
    public ResponseEntity<CheckPointDTO> getById(@PathVariable Long id) {
        CheckPointDTO checkPointDTO = conversionService.convert(checkPointService.findOne(id), CheckPointDTO.class);
        return new ResponseEntity<>(checkPointDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/checkPoints", method = RequestMethod.GET)
    public ResponseEntity<List<CheckPointDTO>> findAll() {
        List<CheckPoint> checkPoints = checkPointService.findAll();
        List<CheckPointDTO> checkPointDTOs = new ArrayList<>();
        for (CheckPoint checkPoint : checkPoints){
            CheckPointDTO checkPointDTO = conversionService.convert(checkPoint, CheckPointDTO.class);
            checkPointDTOs.add(checkPointDTO);
        }
        return new ResponseEntity<>(checkPointDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<CheckPointDTO>> findByWaybillId(@PathVariable Long id) {
        List<CheckPoint> checkPoints = checkPointService.findByWaybillId(id);
        List<CheckPointDTO> checkPointDTOs = new ArrayList<>();
        for (CheckPoint checkPoint : checkPoints){
            CheckPointDTO checkPointDTO = conversionService.convert(checkPoint, CheckPointDTO.class);
            checkPointDTOs.add(checkPointDTO);
        }
        return new ResponseEntity<>(checkPointDTOs, HttpStatus.OK);

    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<CheckPointDTO> create(@RequestBody CheckPointDTO checkPointDTO) {
        CheckPoint checkPointEntity = checkPointService.save(conversionService.convert(checkPointDTO, CheckPoint.class));
        CheckPointDTO resultCheckPoint = conversionService.convert(checkPointEntity, CheckPointDTO.class);
        return new ResponseEntity<>(resultCheckPoint, HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<CheckPointDTO> update(@RequestBody CheckPointDTO checkPointDTO) {
        CheckPoint checkPointEntity = checkPointService.save(conversionService.convert(checkPointDTO, CheckPoint.class));
        CheckPointDTO resultCheckPoint = conversionService.convert(checkPointEntity, CheckPointDTO.class);
        return new ResponseEntity<>(resultCheckPoint,HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        checkPointService.delete(id);
    }
}
