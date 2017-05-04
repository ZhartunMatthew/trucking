package com.itechart.trucking.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;


@Entity (name ="waybill_state")
public class WaybillState implements Serializable {

    private Long idWaybillState;
    private String waybillStateDescription;

    public WaybillState(){}

    @Id
    @Column(name = "id_waybill_state", nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getIdWaybillState() {return idWaybillState;}

    public void setIdWaybillState(Long idWaybillState) {
        this.idWaybillState = idWaybillState;
    }


    @Column(name = "description")
    public String getWaybillStateDescription() {
        return waybillStateDescription;
    }

    public void setWaybillStateDescription(String waybillStateDescription) {
        waybillStateDescription = waybillStateDescription;
    }

}
