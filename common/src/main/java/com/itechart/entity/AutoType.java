package com.itechart.entity;

import com.itechart.entity.enums.AutoTypeEnum;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "auto_type")
public class AutoType implements Serializable {

    private Long idUserRole;
    private AutoTypeEnum autoTypeEnum;

    public AutoType() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_auto_type", nullable = false, insertable = true, updatable = false)
    public Long getIdUserRole() {
        return idUserRole;
    }

    public void setIdUserRole(Long idUserRole) {
        this.idUserRole = idUserRole;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "description", nullable = false)
    public AutoTypeEnum getUserRole() {
        return autoTypeEnum;
    }

    public void setUserRole(AutoTypeEnum userRole) {
        this.autoTypeEnum = userRole;
    }

}
