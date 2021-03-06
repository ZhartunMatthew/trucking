package com.itechart.trucking.services;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.repository.CarRepository;
import com.itechart.trucking.repository.InvoiceRepository;
import com.itechart.trucking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @PreAuthorize("hasPermission(null , 'Invoice', 'GET')")
    @Transactional(readOnly = true)
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'GET')")
    @Transactional(readOnly = true)
    public Invoice findOne(Long id) {
        return invoiceRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Invoice', 'POST') or hasPermission(#invoice.id, 'Invoice', 'PUT')")
    @Transactional
    public Invoice save(Invoice invoice) {
        return invoiceRepository.saveAndFlush(invoice);
    }

    @PreAuthorize("hasPermission(null, 'Invoice', 'POST') or hasPermission(#invoice.id, 'Invoice', 'PUT')")
    @Transactional
    public Invoice saveFullInvoice(Invoice invoice) {
        if(!updateInvoiceDriver(invoice.getDriverUser().getId()) || !updateInvoiceCar(invoice.getCar().getId())) {
            return null;
        }
        return invoiceRepository.saveAndFlush(invoice);
    }

    private boolean updateInvoiceDriver(Long driverId) {
        User user = userRepository.findOne(driverId);
        if(user == null) {
            return false;
        }
        user.setAvailable(false);
        userRepository.save(user);
        return true;
    }

    private boolean updateInvoiceCar(Long carId) {
        Car car = carRepository.findOne(carId);
        if(car == null) {
            return false;
        }
        car.setAvailable(false);
        carRepository.save(car);
        return true;
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        invoiceRepository.delete(id);
    }

    @PreAuthorize("hasPermission(null, 'Invoice', 'GET')")
    @Transactional(readOnly = true)
    public List<Invoice> findByTruckingCompanyId(Long id) {
        return invoiceRepository.findAllByTruckingCompany_Id(id);
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'GET')")
    @Transactional(readOnly = true)
    public Invoice findByIdAndTruckingCompanyId(Long id, Long trId) {
        return invoiceRepository.findByIdAndTruckingCompany_Id(id, trId);
    }

    @PreAuthorize("hasAnyRole('DRIVER', 'MANAGER')")
    @Transactional(readOnly = true)
    public Invoice findByWaybillId(Long id) {
        return invoiceRepository.findByWaybill_Id(id);
    }

    @PreAuthorize("hasAnyRole('DISPATCHER', 'MANAGER', 'DRIVER', 'COMPANY_OWNER')")
    @Transactional(readOnly = true)
    public Invoice securedFindOne(Long id) {
        return invoiceRepository.findOne(id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    @Transactional
    public Long count(Long truckingCompanyId) {
        return invoiceRepository.countByTruckingCompany_Id(truckingCompanyId);
    }

    @PreAuthorize("hasAnyRole('MANAGER')")
    @Transactional
    public List<Invoice> findAllRegistered(Long truckingId) {
        return invoiceRepository
                .findAllByTruckingCompany_IdAndWaybill_Id(truckingId, null);
    }
}
