package com.itechart.repository;

import com.itechart.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    public List<Car> findByAvailableTrue();
}
