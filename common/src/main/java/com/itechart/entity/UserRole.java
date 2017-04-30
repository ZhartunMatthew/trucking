package com.itechart.entity;

import com.itechart.entity.enums.UserRoleEnum;

import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="user_role")
public class UserRole implements Serializable {

    private Long idUserRole;
    private UserRoleEnum userRoleDescription;

    public UserRole(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_user_role", nullable = false, insertable = true, updatable = false)
    public Long getIdUserRole() {
        return idUserRole;
    }

    public void setIdUserRole(Long idUserRole) {
        this.idUserRole = idUserRole;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "description", nullable = false)
    public UserRoleEnum getUserRoleDescription() {
        return userRoleDescription;
    }

    public void setUserRoleDescription(UserRoleEnum userRole) {
        this.userRoleDescription = userRole;
    }


}
