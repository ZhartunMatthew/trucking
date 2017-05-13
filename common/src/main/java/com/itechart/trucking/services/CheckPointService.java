package com.itechart.trucking.services;

import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.repository.CheckPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CheckPointService {

    @Autowired
    private CheckPointRepository checkPointRepository;

    @PreAuthorize("hasPermission(null, 'CheckPoint', 'GET')")
    @Transactional(readOnly = true)
    public List<CheckPoint> findAll() {
        return checkPointRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'CheckPoint', 'GET')")
    @Transactional(readOnly = true)
    public CheckPoint findOne(Long id) {
        return checkPointRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'CheckPoint', 'POST') or hasPermission(#checkPoint.id, 'CheckPoint', 'PUT')")
    @Transactional
    public CheckPoint save(CheckPoint checkPoint) {
        return checkPointRepository.saveAndFlush(checkPoint);
    }

    @PreAuthorize("hasPermission(null, 'CheckPoint', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        checkPointRepository.delete(id);
    }

    @PreAuthorize("hasPermission(#id, 'CheckPoint', 'GET')")
    @Transactional(readOnly = true)
    public List<CheckPoint> findByWaybillId(Long id){return checkPointRepository.findByWaybillId(id);}

    @PreAuthorize("hasAnyRole('DRIVER', 'MANAGER')")
    public CheckPoint securedFindOne(Long id) {
        return checkPointRepository.findOne(id);
    }
}
