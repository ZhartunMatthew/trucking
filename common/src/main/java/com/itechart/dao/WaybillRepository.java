package com.itechart.dao; /**
 * Created by Galina on 18.04.2017.
 */

import com.itechart.entity.Waybill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface WaybillRepository extends CrudRepository<Waybill, Long> {


}
