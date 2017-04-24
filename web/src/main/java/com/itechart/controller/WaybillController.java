package com.itechart.controller;


import com.itechart.entity.Waybill;
import com.itechart.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
public class WaybillController {

    @Autowired
    private WaybillService waybillService;


    @GetMapping(value = "/waybills")
    public String getAllWaybills(){

        /*return waybillService.findAll();*/
        List<Waybill> waybills = waybillService.findAll();
        return "waybill";
    }

    @GetMapping(value = "/{id}")
    public Waybill getWaybillById(@PathVariable("id") long id){
        return waybillService.findWaybill(id);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteWaybillById(@PathVariable("id") int id){
        waybillService.delete(id);
    }


    @PostMapping("/save-waybill")
    public void insertWaybill(@RequestBody Waybill waybill){
        waybillService.save(waybill);
    }
}
