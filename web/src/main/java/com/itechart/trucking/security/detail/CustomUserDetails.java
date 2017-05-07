package com.itechart.trucking.security.detail;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collections;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private UserDTO user;

    public CustomUserDetails(UserDTO user) {
        this.user = user;
    }

    @Override
    public List<? extends UserRoleEnum> getAuthorities() {
        return Collections.singletonList(user.getUserRole());
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getLogin();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return user.getId();
    }

    public Long getTruckingCompanyId() {
        return user.getTruckingCompanyId();
    }

    public UserRoleEnum getRole() {
        return user.getUserRole();
    }
}
