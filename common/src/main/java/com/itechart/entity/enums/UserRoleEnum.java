package com.itechart.entity.enums;

import org.springframework.security.core.GrantedAuthority;

public enum UserRoleEnum implements GrantedAuthority {
    System_Admin,
    Admin,
    Dispatcher,
    Manager,
    Driver,
    Company_Owner;

    @Override
    public String getAuthority() {
        return name();
    }
}
