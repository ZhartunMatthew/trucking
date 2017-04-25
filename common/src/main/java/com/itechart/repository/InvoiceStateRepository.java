package com.itechart.repository;

import com.itechart.entity.InvoiceState;
import com.itechart.entity.enums.InvoiceStateEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceStateRepository extends JpaRepository<InvoiceState, Long> {

    public InvoiceState findByInvoiceStateDescription(InvoiceStateEnum description);

}
