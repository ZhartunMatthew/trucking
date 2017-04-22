package com.itechart.repository;


import com.itechart.entity.AutoType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerCompanyRepository extends JpaRepository<AutoType, Long> {
}
