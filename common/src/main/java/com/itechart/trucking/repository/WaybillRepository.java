package com.itechart.trucking.repository;
import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.entity.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface WaybillRepository extends JpaRepository<Waybill, Long> {
    List<Waybill> findByInvoice_TruckingCompany(TruckingCompany tc);


}
