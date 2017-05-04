package com.itechart.trucking.services;

import com.itechart.trucking.repository.WaybillStateRepository;
import com.itechart.trucking.entity.WaybillState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class WaybillStateService {

    @Autowired
    private WaybillStateRepository waybillStateRepository;

    public List<WaybillState> findAll(){
        List<WaybillState> waybillStates = new ArrayList<>();
        for(WaybillState waybillState : waybillStateRepository.findAll()){
            waybillStates.add(waybillState);
        }
        return waybillStates;
    }

    public WaybillState findWaybillState(long id){
        return waybillStateRepository.findOne(id);
    }

    public void save(WaybillState waybillState){
        waybillStateRepository.save(waybillState);
    }

    public void delete(long id){
        waybillStateRepository.delete(id);
    }
}

