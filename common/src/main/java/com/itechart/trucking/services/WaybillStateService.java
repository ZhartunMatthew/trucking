package com.itechart.trucking.services;

import com.itechart.trucking.entity.WaybillState;
import com.itechart.trucking.repository.WaybillStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class WaybillStateService {

    @Autowired
    private WaybillStateRepository waybillStateRepository;

    public List<WaybillState> findAll() {
        return waybillStateRepository.findAll();
    }

    public WaybillState findOne(Long id) {
        return waybillStateRepository.findOne(id);
    }

    public void save(WaybillState waybillState) {
        waybillStateRepository.save(waybillState);
    }

    public void delete(Long id) {
        waybillStateRepository.delete(id);
    }
}

