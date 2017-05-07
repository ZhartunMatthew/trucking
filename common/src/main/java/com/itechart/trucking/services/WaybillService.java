package com.itechart.trucking.services;


import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import com.itechart.trucking.repository.WaybillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class WaybillService {

    @Autowired
    private WaybillRepository waybillRepository;

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;


    public List<Waybill> findAll() {
        return waybillRepository.findAll();
    }

    public Waybill findOne(Long id) {
        return waybillRepository.findOne(id);
    }

    public Waybill save(Waybill waybill) {return waybillRepository.save(waybill);}

    public void delete(Long id) {
        waybillRepository.delete(id);
    }

    public List<Waybill> findByInvoice_TruckingCompany(Long id){
        TruckingCompany truckingCompany = truckingCompanyRepository.findOne(id);
        return waybillRepository.findByInvoice_TruckingCompany(truckingCompany);
    }


}
