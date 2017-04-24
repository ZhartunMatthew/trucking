package com.itechart.repository;
import com.itechart.entity.Waybill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WaybillRepository extends CrudRepository<Waybill, Long> {


}
