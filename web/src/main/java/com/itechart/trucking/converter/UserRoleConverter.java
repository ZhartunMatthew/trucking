package com.itechart.trucking.converter;

import com.itechart.trucking.dto.UserRoleDTO;
import com.itechart.trucking.entity.UserRole;

public class UserRoleConverter extends AbstractTwoWayConverter<UserRoleDTO, UserRole> {
    @Override
    protected UserRole convert(UserRoleDTO dto) {
        UserRole productState = new UserRole();
        productState.setId(dto.getId());
        productState.setDescription(dto.getName());
        return productState;
    }

    @Override
    protected UserRoleDTO convertBack(UserRole entity) {
        UserRoleDTO dto = new UserRoleDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getDescription());
        return dto;
    }
}
