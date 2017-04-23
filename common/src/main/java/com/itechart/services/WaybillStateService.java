package com.itechart.services;

import com.itechart.repository.WaybillStateRepository;
import com.itechart.entity.WaybillState;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Galina on 20.04.2017.
 */
@Service
@Transactional
public class WaybillStateService {

    private final WaybillStateRepository waybillStateRepository;

    public WaybillStateService(WaybillStateRepository waybillStateRepository) {
        this.waybillStateRepository = waybillStateRepository;
    }

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

