package com.itechart.trucking.controller;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/car")
public class CarController {

    @Autowired
    private CarService service;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Car> getById(@PathVariable Long id) {
        Car car = service.findOne(id);
        return new ResponseEntity<>(car, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Car>> findAll() {
        List<Car> cars = service.findAll();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody Car car) {
        service.save(car);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<Car> update(@RequestBody Car car) {
        service.save(car);
        return new ResponseEntity<>(car, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
