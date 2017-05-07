package com.itechart.trucking.repository;

import com.itechart.trucking.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findAllByTruckingCompany_Id(Long id);
    Invoice findByIdAndTruckingCompany_Id(Long id, Long trId);
}
