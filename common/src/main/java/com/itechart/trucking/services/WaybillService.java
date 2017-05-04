package com.itechart.trucking.services;



import com.itechart.trucking.repository.WaybillRepository;
import com.itechart.trucking.entity.Waybill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class WaybillService {

    @Autowired
    private WaybillRepository waybillRepository;

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

    public Waybill save(Waybill waybill){

        Waybill waybill1 = waybillRepository.save(waybill);
        return waybill;
    }

    public void delete(long id){
        waybillRepository.delete(id);
    }


}
