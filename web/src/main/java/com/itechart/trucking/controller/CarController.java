package com.itechart.trucking.controller;

import com.itechart.trucking.dto.CarDTO;
import com.itechart.trucking.dto.CarTypeDTO;
import com.itechart.trucking.entity.Car;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.CarService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(CarController.class);

    @Autowired
    private CarService service;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CarDTO> getById(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/car/{}  method: GET", id);
        Car car = service.findOne(id);
        CarDTO dto = conversionService.convert(car, CarDTO.class);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CarDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/car  method: GET");
        List<Car> cars = service.findAll();
        List<CarDTO> carDTOs = new ArrayList<>();
        cars.forEach(car ->
                carDTOs.add(conversionService.convert(car, CarDTO.class))
        );
        LOGGER.info("Return carList.size:{}", carDTOs.size());
        return new ResponseEntity<>(carDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/available", /*params = "available",*/ method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<CarDTO>> findAvailableCars(/*@RequestParam Boolean available*/) {
        LOGGER.info("REST request. Path:/api/car  method: GET");
        /*if (!available) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }*/
        List<Car> cars = service.findAvailable();
        List<CarDTO> carDTOs = new ArrayList<>();
        cars.forEach(car ->
                carDTOs.add(conversionService.convert(car, CarDTO.class))
        );
        LOGGER.info("Return carList.size:{}", carDTOs.size());
        return new ResponseEntity<>(carDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<CarDTO> create(@RequestBody CarDTO dto) {
        LOGGER.info("REST request. Path:/api/car  method: POST. car: {}", dto);
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        dto.setTruckingCompanyId(truckingCompanyId);
        dto.setIsAvailable(true);
        Car car = conversionService.convert(dto, Car.class);
        CarDTO dtoFromDB = conversionService.convert(service.save(car), CarDTO.class);
        return new ResponseEntity<>(dtoFromDB, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<CarDTO> update(@PathVariable Long id, @RequestBody CarDTO dtoForUpdate) {
        LOGGER.info("REST request. Path:/api/car/{}  method: PUT.  carInfo: {}", id, dtoForUpdate);
        Car currentCar = service.findOne(id);
        if (currentCar == null) {
            LOGGER.warn("Not found car id: {}", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Car updatedCar = service.save(conversionService.convert(dtoForUpdate, Car.class));
        CarDTO updatedDTO = conversionService.convert(updatedCar, CarDTO.class);
        LOGGER.info("Return updated car: {}", updatedCar);
        return new ResponseEntity<>(updatedDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/car/{}  method: DELETE.", id);
        service.delete(id);
    }
}
