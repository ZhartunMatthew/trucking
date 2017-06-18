package com.itechart.trucking.repository;

import com.itechart.trucking.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByAvailableTrueAndTruckingCompany_Id(Long id);

    List<Car> findAllByTruckingCompany_Id(Long id);

    Long countByTruckingCompany_Id(Long id);
}
