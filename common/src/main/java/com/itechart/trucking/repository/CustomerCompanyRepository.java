package com.itechart.trucking.repository;


import com.itechart.trucking.entity.CustomerCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCompanyRepository extends JpaRepository<CustomerCompany, Long> {
    List<CustomerCompany> findByNameIgnoreCaseContaining(String name);
}
