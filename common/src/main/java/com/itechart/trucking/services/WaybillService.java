package com.itechart.trucking.services;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import com.itechart.trucking.repository.CarRepository;
import com.itechart.trucking.repository.InvoiceRepository;
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
    private  UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @PreAuthorize("hasPermission(null, 'Waybill', 'GET')")
    @Transactional(readOnly = true)
    public List<Waybill> findAll() {
        return waybillRepository.findAll();
    }

    @PreAuthorize("hasRole('COMPANY_OWNER')")
    @Transactional(readOnly = true)
    public List<Waybill> findAllByState(WaybillStateEnum state, Long truckingCompanyId) {
        return waybillRepository.findByWaybillStateAndInvoice_TruckingCompany_Id_OrderByDestinationDateAsc(state,
                truckingCompanyId);
    }

    @PreAuthorize("hasPermission(#id, 'Waybill', 'GET')")
    @Transactional(readOnly = true)
    public Waybill findOne(Long id) {
        return waybillRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Waybill', 'POST') or hasPermission(#waybill.id, 'Waybill', 'PUT')")
    @Transactional
    public Waybill save(Waybill waybill) {return waybillRepository.saveAndFlush(waybill);}

    @PreAuthorize("hasPermission(null, 'Waybill', 'POST') or hasPermission(#waybill.id, 'Waybill', 'PUT')")
    @Transactional
    public Waybill saveFullWaybill(Waybill waybill) {
        if(!updateWaybillDriver(waybill.getInvoice().getId()) || !updateWaybillCar(waybill.getInvoice().getId())) {
            return null;
        }
        return waybillRepository.saveAndFlush(waybill);
    }

    private boolean updateWaybillDriver(Long invoiceId) {
        Invoice invoice = invoiceRepository.findOne(invoiceId);
        if(invoice == null) {
            return false;
        }
        User user = userRepository.findOne(invoice.getDriverUser().getId());
        if(user == null) {
            return false;
        }
        user.setAvailable(true);
        userRepository.save(user);
        return true;
    }

    private boolean updateWaybillCar(Long invoiceId) {
        Invoice invoice = invoiceRepository.findOne(invoiceId);
        if(invoice == null) {
            return false;
        }
        Car car = carRepository.findOne(invoice.getCar().getId());
        if(car == null) {
            return false;
        }
        car.setAvailable(true);
        carRepository.save(car);
        return true;
    }

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
