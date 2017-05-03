package com.itechart.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "car_type")
public class CarType implements Serializable {

    private Long idCarType;
    private String descriptionCarType;

    public CarType() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_car_type", nullable = false, insertable = true, updatable = false)
    public Long getIdCarType() {
        return idCarType;
    }

    public void setIdCarType(Long idCarType) {
        this.idCarType = idCarType;
    }

    @Column(name = "description", nullable = false)
    public String getDescriptionCarType() {
        return descriptionCarType;
    }

    public void setDescriptionCarType (String descriptionCarType) {
        this.descriptionCarType = descriptionCarType;
    }

}
