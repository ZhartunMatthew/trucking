package com.itechart.services;

import com.itechart.entity.AutoType;
import com.itechart.repository.AutoTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class AutoTypeService {
    @Autowired
    private AutoTypeRepository autoTypeRepository;

    public List<AutoType> findAll() {
        return autoTypeRepository.findAll();
    }

    public AutoType findOne(Long id) {
        return autoTypeRepository.findOne(id);
    }

    public void save(AutoType auto) {
        autoTypeRepository.saveAndFlush(auto);
    }

    public void delete(Long id) {
        autoTypeRepository.delete(id);
    }
}
