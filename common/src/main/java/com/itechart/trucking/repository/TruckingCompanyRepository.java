package com.itechart.trucking.repository;

import com.itechart.trucking.entity.TruckingCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TruckingCompanyRepository extends JpaRepository<TruckingCompany, Long> {
    TruckingCompany findByTaxpayerNumber(String taxNumber);
}
