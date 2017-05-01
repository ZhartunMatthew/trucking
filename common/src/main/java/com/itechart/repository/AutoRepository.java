package com.itechart.repository;

import com.itechart.entity.Auto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {

    public List<Auto> findByAvailableTrue();
}
