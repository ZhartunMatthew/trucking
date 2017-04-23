package com.itechart.entity;

import com.itechart.entity.enums.DescriptionEnum;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;


@Entity (name ="waybill_state")
public class WaybillState implements Serializable {

    private static final long serialVersionUID = -5749235697982515014l;


    private Long idWaybillState;
    private DescriptionEnum DescriptionEnum;
    private Set<Waybill> waybills;

    public WaybillState(){}

    @Id
    @Column(name = "id_waybill_state", nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getIdWaybillState() {return idWaybillState;}

    public void setIdWaybillState(Long idWaybillState) {
        this.idWaybillState = idWaybillState;
    }


    @Column(name = "description_enum")
    @Enumerated(EnumType.STRING)
    public DescriptionEnum getDescriptionEnum() {return DescriptionEnum;}

    public void setDescriptionEnum(com.itechart.entity.enums.DescriptionEnum descriptionEnum) {DescriptionEnum = descriptionEnum;}


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "waybillState", cascade = CascadeType.ALL)
    public Set<Waybill> getWaybills() {
        return waybills;
    }

    public void setWaybills(Set<Waybill> waybills) {
        this.waybills = waybills;
    }


    @Override
    public String toString() {
        return "WaybillState{" +
                "idWaybillState=" + idWaybillState +
                ", DescriptionEnum=" + DescriptionEnum +
                ", waybills=" + waybills +
                '}';
    }






}
