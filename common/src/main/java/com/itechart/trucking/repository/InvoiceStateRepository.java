package com.itechart.trucking.repository;

import com.itechart.trucking.entity.InvoiceState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceStateRepository extends JpaRepository<InvoiceState, Long> {


}
