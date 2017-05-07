package com.itechart.trucking.services;

import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.repository.CheckPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CheckPointService {

    @Autowired
    private CheckPointRepository checkPointRepository;

    public List<CheckPoint> findAll() {
        return checkPointRepository.findAll();
    }

    public CheckPoint findOne(Long id) {
        return checkPointRepository.findOne(id);
    }

    public CheckPoint save(CheckPoint checkPoint) {
        return checkPointRepository.save(checkPoint);
    }

    public void delete(Long id) {
        checkPointRepository.delete(id);
    }

    public List<CheckPoint> findByWaybillId(Long id){return checkPointRepository.findByWaybillId(id);}


}
