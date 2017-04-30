package com.itechart.repository;

import com.itechart.entity.CheckPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;



public interface CheckPointRepository extends JpaRepository<CheckPoint, Long> {


}
