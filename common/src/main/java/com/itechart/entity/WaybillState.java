package com.itechart.entity;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;

/**
 * Created by Galina on 19.04.2017.
 */
@Entity (name ="waybill_state")
public class WaybillState implements Serializable {

    private static final long serialVersionUID = -5749235697982515014l;

    @Id
    @Column(name = "id_waybill_state", nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idWaybillState;

    @Column(name = "description_enum")
    @Enumerated(EnumType.STRING)
    private DescriptionEnum DescriptionEnum;

    @OneToMany/*(fetch = FetchType.LAZY, mappedBy = "waybill_state", cascade = CascadeType.ALL)*/
    private Set<Waybill> waybills;

    public WaybillState(){}

    @Override
    public String toString() {
        return "WaybillState{" +
                "idWaybillState=" + idWaybillState +
                ", DescriptionEnum=" + DescriptionEnum +
                ", waybills=" + waybills +
                '}';
    }

    public Set<Waybill> getWaybills() {
        return waybills;
    }

    public void setWaybills(Set<Waybill> waybills) {
        this.waybills = waybills;
    }

    public com.itechart.entity.DescriptionEnum getDescriptionEnum() {

        return DescriptionEnum;
    }

    public void setDescriptionEnum(com.itechart.entity.DescriptionEnum descriptionEnum) {
        DescriptionEnum = descriptionEnum;
    }

    public Long getIdWaybillState() {

        return idWaybillState;
    }

    public void setIdWaybillState(Long idWaybillState) {
        this.idWaybillState = idWaybillState;
    }
}
