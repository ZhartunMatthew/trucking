package com.itechart.services;

import com.itechart.entity.Car;
import com.itechart.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public Car findOne(Long id) {
        return carRepository.findOne(id);
    }

    public void save(Car car) {
        carRepository.saveAndFlush(car);
    }

    public void delete(Long id) {
        carRepository.delete(id);
    }

    public List<Car> findAvailable() {
        return carRepository.findByAvailableTrue();
    }
}
