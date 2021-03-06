package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CheckPointDTO;
import com.itechart.trucking.dto.WaybillDTO;
import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.services.CheckPointService;
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
@RequestMapping(value = "/api/checkpoint")
public class CheckPointController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CheckPointController.class);

    @Autowired
    private CheckPointService checkPointService;
    @Autowired
    private WaybillService waybillService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CheckPointDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/checkPoint  method: GET");
        List<CheckPoint> checkPoints = checkPointService.findAll();
        List<CheckPointDTO> checkPointDTOs = new ArrayList<>();
        for (CheckPoint checkPoint : checkPoints){
            CheckPointDTO checkPointDTO = conversionService.convert(checkPoint, CheckPointDTO.class);
            checkPointDTOs.add(checkPointDTO);
        }
        LOGGER.info("Return checkPointList.size:{}", checkPointDTOs.size());
        return new ResponseEntity<>(checkPointDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CheckPointDTO>> findByWaybillId(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/checkPoint/{} method: GET", id);
        List<CheckPoint> checkPoints = checkPointService.findByWaybillId(id);
        List<CheckPointDTO> checkPointDTOs = new ArrayList<>();
        for (CheckPoint checkPoint : checkPoints){
            CheckPointDTO checkPointDTO = conversionService.convert(checkPoint, CheckPointDTO.class);
            checkPointDTOs.add(checkPointDTO);
        }
        LOGGER.info("Return checkPointList.size:{}", checkPointDTOs.size());
        return new ResponseEntity<>(checkPointDTOs, HttpStatus.OK);

    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<CheckPointDTO> create(@RequestBody CheckPointDTO checkPointDTO) {
        LOGGER.info("REST request. Path:/api/checkPoint  method: POST. checkPoint: {}", checkPointDTO);
        CheckPoint checkPointEntity = checkPointService.save(conversionService.convert(checkPointDTO, CheckPoint.class));
        CheckPointDTO resultCheckPoint = conversionService.convert(checkPointEntity, CheckPointDTO.class);
        return new ResponseEntity<>(resultCheckPoint, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<CheckPointDTO> update(@PathVariable Long id, @RequestBody CheckPointDTO checkPointDTO) {
        LOGGER.info("REST request. Path:/api/checkPoint/{}  method: PUT.  checkPointInfo: {}", id, checkPointDTO);
        CheckPoint checkPointEntity = checkPointService.save(conversionService.convert(checkPointDTO, CheckPoint.class));
        CheckPointDTO resultCheckPoint = conversionService.convert(checkPointEntity, CheckPointDTO.class);
        return new ResponseEntity<>(resultCheckPoint,HttpStatus.OK);
    }

    @RequestMapping(value = "/check", method = RequestMethod.PUT)
    public ResponseEntity<WaybillDTO> checkPassed(@RequestBody CheckPointDTO checkPointDTO) {
        LOGGER.info("REST request. Path:/api/checkPoint/check  method: PUT.  checkPointInfo: {}", checkPointDTO);
        checkPointDTO.setPathDate(new Date());
        checkPointService.save(conversionService.convert(checkPointDTO, CheckPoint.class));
        WaybillDTO waybillDTO = conversionService.convert(waybillService.findOne(checkPointDTO.getWaybillId()), WaybillDTO.class);
        return new ResponseEntity<>(waybillDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/checkPoint/{} method: DELETE.", id);
        checkPointService.delete(id);
    }
}
