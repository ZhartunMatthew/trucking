package com.itechart.repository;


import com.itechart.entity.TruckingCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TruckingCompanyRepository extends JpaRepository<TruckingCompany, Long> {
}
