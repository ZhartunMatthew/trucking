package com.itechart.trucking.controller;

import com.itechart.trucking.charts.HighchartsUtil;
import com.itechart.trucking.dto.HighchartsDTO;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/highcharts")
public class HighchartsController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerCompanyController.class);

    @Autowired
    private HighchartsUtil highchartsUtil;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<HighchartsDTO> get() {
        LOGGER.info("REST request. Path:/api/highcharts  method: GET");
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        HighchartsDTO dto = highchartsUtil.calculate(truckingCompanyId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
