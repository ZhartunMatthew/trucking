package com.itechart.services;

import com.itechart.entity.CustomerCompany;
import com.itechart.repository.CustomerCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CustomerCompanyService {
    @Autowired
    private CustomerCompanyRepository customerCompanyRepository;

    public List<CustomerCompany> findAll() {
        return customerCompanyRepository.findAll();
    }

    public CustomerCompany findOne(Long id) {
        return customerCompanyRepository.findOne(id);
    }

    public void save(CustomerCompany customerCompany) {
        customerCompanyRepository.saveAndFlush(customerCompany);
    }

    public void delete(Long id) {
        customerCompanyRepository.delete(id);
    }
}
