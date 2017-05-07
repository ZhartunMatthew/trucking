package com.itechart.trucking.services;

import com.itechart.trucking.entity.WaybillState;
import com.itechart.trucking.repository.WaybillStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;


@Service
public class WaybillStateService {

    @Autowired
    private WaybillStateRepository waybillStateRepository;

    @Transactional(readOnly = true)
    public List<WaybillState> findAll() {
        return waybillStateRepository.findAll();
    }

    @Transactional(readOnly = true)
    public WaybillState findOne(Long id) {
        return waybillStateRepository.findOne(id);
    }

    @Transactional
    public void save(WaybillState waybillState) {waybillStateRepository.saveAndFlush(waybillState);}

    @Transactional
    public void delete(Long id) {
        waybillStateRepository.delete(id);
    }
}

