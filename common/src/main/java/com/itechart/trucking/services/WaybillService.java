package com.itechart.trucking.services;


import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import com.itechart.trucking.repository.WaybillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;



@Service
public class WaybillService {

    @Autowired
    private WaybillRepository waybillRepository;

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    @Transactional(readOnly = true)
    public List<Waybill> findAll() {
        return waybillRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Waybill findOne(Long id) {
        return waybillRepository.findOne(id);
    }

    @Transactional
    public Waybill save(Waybill waybill) {return waybillRepository.saveAndFlush(waybill);}

    @Transactional
    public void delete(Long id) {
        waybillRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public List<Waybill> findByInvoice_TruckingCompany(Long id){
        TruckingCompany truckingCompany = truckingCompanyRepository.findOne(id);
        return waybillRepository.findByInvoice_TruckingCompany(truckingCompany);
    }


}
