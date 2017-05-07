package com.itechart.trucking.services;

import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.repository.CheckPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CheckPointService {

    @Autowired
    private CheckPointRepository checkPointRepository;

    @Transactional(readOnly = true)
    public List<CheckPoint> findAll() {
        return checkPointRepository.findAll();
    }

    @Transactional(readOnly = true)
    public CheckPoint findOne(Long id) {
        return checkPointRepository.findOne(id);
    }

    @Transactional
    public CheckPoint save(CheckPoint checkPoint) {
        return checkPointRepository.saveAndFlush(checkPoint);
    }

    @Transactional
    public void delete(Long id) {
        checkPointRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public List<CheckPoint> findByWaybillId(Long id){return checkPointRepository.findByWaybillId(id);}


}
