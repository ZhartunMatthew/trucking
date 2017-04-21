package com.itechart.controller;


import com.itechart.entity.Waybill;
import com.itechart.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * Created by Galina on 20.04.2017.
 */
@RestController
public class WaybillController {

    @Autowired
    private WaybillService waybillService;

    @GetMapping(value = "/waybills")
    public List<Waybill> getAllWaybills(){
        return waybillService.findAll();
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
