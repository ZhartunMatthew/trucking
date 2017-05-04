package com.itechart.trucking.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="user_role")
public class UserRole implements Serializable {

    private Long idUserRole;
    private String userRoleDescription;

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

    @Column(name = "description", nullable = false)
    public String getUserRoleDescription() {
        return userRoleDescription;
    }

    public void setUserRoleDescription(String userRole) {
        this.userRoleDescription = userRole;
    }


}
