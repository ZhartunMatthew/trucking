package com.itechart.trucking.services;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @PreAuthorize("hasPermission(null, 'Car', 'GET')")
    @Transactional(readOnly = true)
    public List<Car> findAll() {
        return carRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'Car', 'GET')")
    @Transactional(readOnly = true)
    public Car findOne(Long id) {
        return carRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Car', 'POST') or hasPermission(#car.id, 'Car', 'PUT')")
    @Transactional
    public Car save(Car car) {
        return carRepository.saveAndFlush(car);
    }

    @PreAuthorize("hasPermission(#id, 'Car', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        carRepository.delete(id);
    }

    @PreAuthorize("hasPermission(null, 'Car', 'GET')")
    @Transactional(readOnly = true)
    public List<Car> findAvailable() {
        return carRepository.findByAvailableTrue();
    }
}
