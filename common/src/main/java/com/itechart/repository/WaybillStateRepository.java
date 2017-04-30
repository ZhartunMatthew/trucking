package com.itechart.repository;


import com.itechart.entity.WaybillState;
import com.itechart.entity.enums.WaybillStateEnum;
import org.springframework.data.jpa.repository.JpaRepository;



public interface WaybillStateRepository extends JpaRepository<WaybillState, Long> {
    WaybillState findByWaybillStateEnum(WaybillStateEnum desc);

}
