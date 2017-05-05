package com.itechart.trucking.services;

import com.itechart.trucking.entity.InvoiceState;
import com.itechart.trucking.repository.InvoiceStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class InvoiceStateService {

    @Autowired
    private InvoiceStateRepository invoiceStateRepository;

    public List<InvoiceState> findAll() {
        return invoiceStateRepository.findAll();
    }

    public InvoiceState findOne(Long id) {
        return invoiceStateRepository.findOne(id);
    }

    public void save(InvoiceState invoiceState) {
        invoiceStateRepository.saveAndFlush(invoiceState);
    }

    public void delete(Long id) {
        invoiceStateRepository.delete(id);
    }

}

