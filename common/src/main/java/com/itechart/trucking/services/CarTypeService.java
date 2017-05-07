package com.itechart.trucking.services;

import com.itechart.trucking.entity.CarType;
import com.itechart.trucking.repository.CarTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CarTypeService {

    @Autowired
    private CarTypeRepository carTypeRepository;

    public List<CarType> findAll() {
        return carTypeRepository.findAll();
    }
}
