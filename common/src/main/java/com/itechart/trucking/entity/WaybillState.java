package com.itechart.trucking.entity;

import javax.persistence.*;


@Entity(name = "waybill_state")
public class WaybillState extends BaseEntity {

    private String description;

    public WaybillState() {
    }

    @Id
    @Column(name = "id_waybill_state", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
