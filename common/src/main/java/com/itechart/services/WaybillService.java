package com.itechart.services;

/**
 * Created by Galina on 20.04.2017.
 */

import com.itechart.dao.WaybillRepository;
import com.itechart.entity.Waybill;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class WaybillService {

    private final WaybillRepository waybillRepository;

    public WaybillService(WaybillRepository waybillRepository) {
        this.waybillRepository = waybillRepository;
    }

    public List<Waybill> findAll(){
        List<Waybill> waybills = new ArrayList<>();
        for(Waybill waybill : waybillRepository.findAll()){
            waybills.add(waybill);
        }

       return waybills;
    }

    public Waybill findWaybill(long id){
        return waybillRepository.findOne(id);
    }

    public void save(Waybill waybill){
        waybillRepository.save(waybill);
    }

    public void delete(long id){
        waybillRepository.delete(id);
    }


}