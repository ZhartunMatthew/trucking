package com.itechart.trucking.services;

import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @PreAuthorize("hasPermission(null , 'Invoice', 'GET')")
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'GET')")
    public Invoice findOne(Long id) {
        return invoiceRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Invoice', 'POST') or hasPermission(#invoice.id, 'Invoice', 'PUT')")
    public Invoice save(Invoice invoice) {
        return invoiceRepository.saveAndFlush(invoice);
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'DELETE')")
    public void delete(Long id) {
        invoiceRepository.delete(id);
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'GET')")
    public List<Invoice> findByTruckingCompanyId(Long id) {
        return invoiceRepository.findAllByTruckingCompany_Id(id);
    }

    @PreAuthorize("hasPermission(#id, 'Invoice', 'GET')")
    public Invoice findByIdAndTruckingCompanyId(Long id, Long trId) {
        return invoiceRepository.findByIdAndTruckingCompany_Id(id, trId);
    }
}
