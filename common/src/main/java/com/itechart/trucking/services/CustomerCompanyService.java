package com.itechart.trucking.services;

import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.repository.CustomerCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerCompanyService {

    @Autowired
    private CustomerCompanyRepository customerCompanyRepository;

    @PreAuthorize("hasPermission(null, 'CustomerCompany', 'GET')")
    @Transactional(readOnly = true)
    public List<CustomerCompany> findAll() {
        return customerCompanyRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'CustomerCompany', 'GET')")
    @Transactional(readOnly = true)
    public CustomerCompany findOne(Long id) {
        return customerCompanyRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'CustomerCompany', 'POST') or hasPermission(#customerCompany.id, 'CustomerCompany', 'PUT')")
    @Transactional
    public CustomerCompany save(CustomerCompany customerCompany) {
        return customerCompanyRepository.saveAndFlush(customerCompany);
    }

    @PreAuthorize("hasPermission(#id, 'CustomerCompany', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        customerCompanyRepository.delete(id);
    }

    @PreAuthorize("hasPermission(null, 'CustomerCompany', 'GET')")
    @Transactional(readOnly = true)
    public List<CustomerCompany> findByNameContaining(String name) {
        return customerCompanyRepository.findByNameIgnoreCaseContaining(name);
    }
}
