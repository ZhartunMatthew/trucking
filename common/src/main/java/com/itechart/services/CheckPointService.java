package com.itechart.services;

import com.itechart.repository.CheckPointRepository;
import com.itechart.entity.CheckPoint;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
    public class CheckPointService {

    private final CheckPointRepository checkPointRepository;

    public CheckPointService(CheckPointRepository checkPointRepository) {
        this.checkPointRepository = checkPointRepository;
    }

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
}
