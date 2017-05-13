package com.itechart.trucking.entity.enums;

import org.springframework.security.core.GrantedAuthority;

public enum UserRoleEnum implements GrantedAuthority {
    SYSTEM_ADMIN,
    ADMIN,
    DISPATCHER,
    MANAGER,
    DRIVER,
    COMPANY_OWNER;

    private static final String ROLE = "ROLE_";

    @Override
    public String getAuthority() {
        return ROLE + name();
    }
}
