package com.itechart.trucking.repository;

import com.itechart.trucking.entity.CheckPoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface CheckPointRepository extends JpaRepository<CheckPoint, Long> {
    List<CheckPoint> findByWaybillId(Long id);
}
