package com.itechart.trucking.converter;

import com.itechart.trucking.dto.UserRoleDTO;
import com.itechart.trucking.entity.UserRole;
import org.springframework.stereotype.Component;

@Component
public class UserRoleConverter extends AbstractTwoWayConverter<UserRoleDTO, UserRole> {

    @Override
    protected UserRole convert(UserRoleDTO dto) {
        UserRole entity = new UserRole();
        entity.setId(dto.getId());
        entity.setDescription(dto.getName());
        return entity;
    }

    @Override
    protected UserRoleDTO convertBack(UserRole entity) {
        UserRoleDTO dto = new UserRoleDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
