package com.itechart.trucking.services;

import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TruckingCompanyService {

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    @PreAuthorize("hasPermission(null , 'TruckingCompany', 'GET')")
    @Transactional(readOnly = true)
    public List<TruckingCompany> findAll() {
        return truckingCompanyRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'TruckingCompany', 'GET')")
    @Transactional(readOnly = true)
    public TruckingCompany findOne(Long id) {
        return truckingCompanyRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'TruckingCompany', 'POST') or hasPermission(#truckingCompany.id, 'TruckingCompany', 'PUT')")
    @Transactional
    public TruckingCompany save(TruckingCompany truckingCompany) {
        return truckingCompanyRepository.saveAndFlush(truckingCompany);
    }
}
