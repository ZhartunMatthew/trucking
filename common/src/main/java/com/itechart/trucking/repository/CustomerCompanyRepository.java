package com.itechart.trucking.repository;


import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.entity.TruckingCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCompanyRepository extends JpaRepository<CustomerCompany, Long> {
    List<CustomerCompany> findByNameIgnoreCaseContaining(String name);

    List<CustomerCompany> findAllByTruckingCompany_Id(Long id);

    Long countByTruckingCompany_Id(Long truckingCompanyId);
}
