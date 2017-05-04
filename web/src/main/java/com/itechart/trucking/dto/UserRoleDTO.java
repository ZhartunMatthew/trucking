package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@ToString
public class UserRoleDTO extends AbstractDTO implements GrantedAuthority {
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
