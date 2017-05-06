package com.itechart.trucking.dto;

import com.itechart.trucking.entity.UserRole;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
@ToString
public class UserRoleDTO extends AbstractDTO implements GrantedAuthority {
    private String name;

    public UserRoleDTO(){}

    public UserRoleDTO(UserRole role) {
        this.id = role.getId();
        this.name = role.getDescription();
    }

    @Override
    public String getAuthority() {
        return name;
    }
}
