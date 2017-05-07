package com.itechart.trucking.services;

import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.repository.CustomerCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerCompanyService {

    @Autowired
    private CustomerCompanyRepository customerCompanyRepository;

    @Transactional(readOnly = true)
    public List<CustomerCompany> findAll() {
        return customerCompanyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public CustomerCompany findOne(Long id) {
        return customerCompanyRepository.findOne(id);
    }

    @Transactional
    public CustomerCompany save(CustomerCompany customerCompany) {
        return customerCompanyRepository.saveAndFlush(customerCompany);
    }

    @Transactional
    public void delete(Long id) {
        customerCompanyRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public List<CustomerCompany> findByNameContaining(String name) {
        return customerCompanyRepository.findByNameIgnoreCaseContaining(name);
    }
}