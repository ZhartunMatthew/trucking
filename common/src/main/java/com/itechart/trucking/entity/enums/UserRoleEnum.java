package com.itechart.trucking.entity.enums;

import org.springframework.security.core.GrantedAuthority;

public enum UserRoleEnum implements GrantedAuthority {
    SYSTEM_ADMIN,
    ADMIN,
    DISPATCHER,
    MANAGER,
    DRIVER,
    COMPANY_OWNER;

    @Override
    public String getAuthority() {
        return name();
    }
}
