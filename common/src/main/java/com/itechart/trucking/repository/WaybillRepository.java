package com.itechart.trucking.repository;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.WaybillStateEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WaybillRepository extends JpaRepository<Waybill, Long> {
    List<Waybill> findByInvoice_TruckingCompany_Id(Long Id);

    List<Waybill> findByInvoice_DriverUser(User user);

    List<Waybill> findByWaybillStateAndInvoice_TruckingCompany_Id_OrderByDestinationDateAsc(WaybillStateEnum state,
                                                                                            Long id);
}
