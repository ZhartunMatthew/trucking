package com.itechart.trucking.services;

import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    public Invoice findOne(Long id) {
        return invoiceRepository.findOne(id);
    }

    public Invoice save(Invoice invoice) {
        return invoiceRepository.saveAndFlush(invoice);
    }

    public void delete(Long id) {
        invoiceRepository.delete(id);
    }
}
