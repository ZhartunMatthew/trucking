package com.itechart.trucking.services;

import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TruckingCompanyService {

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    @Transactional(readOnly = true)
    public List<TruckingCompany> findAll() {
        return truckingCompanyRepository.findAll();
    }

    @Transactional(readOnly = true)
    public TruckingCompany findOne(Long id) {
        return truckingCompanyRepository.findOne(id);
    }

    @Transactional
    public TruckingCompany save(TruckingCompany truckingCompany) {
        return truckingCompanyRepository.saveAndFlush(truckingCompany);
    }
}
