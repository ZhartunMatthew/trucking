package com.itechart.trucking.services;


import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import com.itechart.trucking.repository.UserRepository;
import com.itechart.trucking.repository.WaybillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;



@Service
public class WaybillService {

    @Autowired
    private WaybillRepository waybillRepository;

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    @Autowired
    private  UserRepository userRepository;

    @PreAuthorize("hasPermission(null, 'Waybill', 'GET')")
    @Transactional(readOnly = true)
    public List<Waybill> findAll() {
        return waybillRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'Waybill', 'GET')")
    @Transactional(readOnly = true)
    public Waybill findOne(Long id) {
        return waybillRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Waybill', 'POST') or hasPermission(#waybill.id, 'Waybill', 'PUT')")
    @Transactional
    public Waybill save(Waybill waybill) {return waybillRepository.saveAndFlush(waybill);}

    @PreAuthorize("hasPermission(#id, 'Waybill', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        waybillRepository.delete(id);
    }

    @PreAuthorize("hasPermission(#id, 'Waybill', 'GET_BY_TRUCKING_ID')")
    @Transactional(readOnly = true)
    public List<Waybill> findByInvoice_TruckingCompany(Long id){
        return waybillRepository.findByInvoice_TruckingCompany_Id(id);
    }

    @PreAuthorize("hasPermission(#id, 'Waybill', 'GET_BY_DRIVER_ID')")
    @Transactional(readOnly = true)
    public List<Waybill> findByInvoice_DriverUser(Long id){
        User driver =  userRepository.findOne(id);
        return waybillRepository.findByInvoice_DriverUser(driver);
    }

    @PreAuthorize("hasAnyRole('MANAGER', 'DRIVER')")
    public Waybill securedFindOne(Long id) {
        return waybillRepository.findOne(id);
    }


}
