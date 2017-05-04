package com.itechart.trucking.repository;
import com.itechart.trucking.entity.Waybill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WaybillRepository extends JpaRepository<Waybill, Long> {


}
