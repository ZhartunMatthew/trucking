package com.itechart.trucking.services;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Transactional(readOnly = true)
    public List<Car> findAll() {
        return carRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Car findOne(Long id) {
        return carRepository.findOne(id);
    }

    @Transactional
    public Car save(Car car) {
        return carRepository.saveAndFlush(car);
    }

    @Transactional
    public void delete(Long id) {
        carRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public List<Car> findAvailable() {
        return carRepository.findByAvailableTrue();
    }
}
