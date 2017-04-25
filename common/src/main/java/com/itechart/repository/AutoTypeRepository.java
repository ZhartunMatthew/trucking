package com.itechart.repository;

import com.itechart.entity.AutoType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutoTypeRepository extends JpaRepository<AutoType, Long> {
}
