package com.itechart.trucking.services;

import com.itechart.trucking.repository.CheckPointRepository;
import com.itechart.trucking.entity.CheckPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
    public class CheckPointService {

    @Autowired
    private CheckPointRepository checkPointRepository;

    public List<CheckPoint> findAll(){
        List<CheckPoint> checkPoints = new ArrayList<>();
        for(CheckPoint checkPoint : checkPointRepository.findAll()){
            checkPoints.add(checkPoint);
        }
        return checkPoints;
    }

    public CheckPoint findCheckPoint(long id){
        return checkPointRepository.findOne(id);
    }

    public void save(CheckPoint checkPoint){
        checkPointRepository.save(checkPoint);
    }

    public void delete(long id){
        checkPointRepository.delete(id);
    }

    public void deleteAll(){
        checkPointRepository.deleteAll();
    }


}
