package com.itechart.repository;


import com.itechart.entity.CustomerCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TruckingCompanyRepository extends JpaRepository<CustomerCompany, Long> {
}
