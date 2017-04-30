package com.itechart.entity;

import com.itechart.entity.enums.AutoTypeEnum;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity(name = "auto_type")
public class AutoType implements Serializable {

    private Long idAutoType;
    private AutoTypeEnum autoTypeEnum;
    private Set<Auto> autos;

    public AutoType() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_auto_type", nullable = false, insertable = true, updatable = false)
    public Long getIdAutoType() {
        return idAutoType;
    }

    public void setIdAutoType(Long idAutoType) {
        this.idAutoType = idAutoType;
    }


    @Enumerated(EnumType.STRING)
    @Column(name = "description", nullable = false)
    public AutoTypeEnum getAutoTypeEnum() {
        return autoTypeEnum;
    }

    public void setAutoTypeEnum(AutoTypeEnum autoTypeEnum) {
        this.autoTypeEnum = autoTypeEnum;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "autoType", cascade = CascadeType.ALL)
    public Set<Auto> getAutos() {
        return autos;
    }

    public void setAutos(Set<Auto> autos) {
        this.autos = autos;
    }
}
