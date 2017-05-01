package com.itechart.services;

import com.itechart.entity.Auto;
import com.itechart.repository.AutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AutoService {

    @Autowired
    private AutoRepository autoRepository;

    public List<Auto> findAll() {
        return autoRepository.findAll();
    }

    public Auto findOne(Long id) {
        return autoRepository.findOne(id);
    }

    public void save(Auto auto) {
        autoRepository.saveAndFlush(auto);
    }

    public void delete(Long id) {
        autoRepository.delete(id);
    }

    public List<Auto> findAvailable() {
        return autoRepository.findByAvailableTrue();
    }
}
