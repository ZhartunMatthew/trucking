package com.itechart.trucking.services;

import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class TruckingCompanyService {

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    public List<TruckingCompany> findAll() {
        return truckingCompanyRepository.findAll();
    }

    public TruckingCompany findOne(Long id) {
        return truckingCompanyRepository.findOne(id);
    }

    public void save(TruckingCompany truckingCompany) {
        truckingCompanyRepository.saveAndFlush(truckingCompany);
    }

    public void delete(Long id) {
        truckingCompanyRepository.delete(id);
    }
}
