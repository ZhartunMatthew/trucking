package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CarDTO;
import com.itechart.trucking.entity.Car;
import com.itechart.trucking.services.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/car")
public class CarController {

    @Autowired
    private CarService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CarDTO> getById(@PathVariable Long id) {
        Car car = service.findOne(id);
        CarDTO dto = conversionService.convert(car, CarDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<CarDTO>> findAll() {
        List<Car> cars = service.findAll();
        List<CarDTO> carDTOs     = new ArrayList<>();
        cars.forEach(car ->
                carDTOs.add(conversionService.convert(car, CarDTO.class))
        );
        return new ResponseEntity<>(carDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CarDTO>> findAvailableCars(@RequestParam(value = "available") Boolean available) {
        if (!available) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        List<Car> cars = service.findAvailable();
        List<CarDTO> carDTOs = new ArrayList<>();
        cars.forEach(car ->
                carDTOs.add(conversionService.convert(car, CarDTO.class))
        );
        return new ResponseEntity<>(carDTOs, HttpStatus.OK);
    }


    @RequestMapping(value = "", method = RequestMethod.POST)
    public void create(@RequestBody CarDTO dto) {
        Car car = conversionService.convert(dto, Car.class);
        service.save(car);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CarDTO> update(@PathVariable Long id, @RequestBody CarDTO dtoForUpdate) {
        Car currentCar = service.findOne(id);
        if (currentCar == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Car updatedCar = service.save(conversionService.convert(dtoForUpdate, Car.class));
        CarDTO updatedDTO = conversionService.convert(updatedCar, CarDTO.class);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
