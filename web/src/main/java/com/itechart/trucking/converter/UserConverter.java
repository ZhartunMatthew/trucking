package com.itechart.trucking.converter;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.services.TruckingCompanyService;
import com.itechart.trucking.services.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserConverter extends AbstractTwoWayConverter<UserDTO, User> {

    @Autowired
    private UserRoleService userRoleService;

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    @Override
    protected User convert(UserDTO dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setSurname(dto.getSurname());
        entity.setPatronymic(dto.getPatronymic());
        entity.setEmail(dto.getEmail());
        entity.setCity(dto.getCity());
        entity.setStreet(dto.getStreet());
        entity.setHouse(dto.getHouse());
        entity.setFlat(dto.getFlat());
        entity.setLogin(dto.getLogin());
        entity.setPassword(dto.getPassword());
        entity.setAvailable(dto.getIsAvailable());
        entity.setUserRole(userRoleService.findOne(dto.getUserRoleId()));
        entity.setTruckingCompany(truckingCompanyService.findOne(dto.getTruckingCompanyId()));
        return entity;
    }

    @Override
    protected UserDTO convertBack(User entity) {
        UserDTO dto = new UserDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setSurname(entity.getSurname());
        dto.setPatronymic(entity.getPatronymic());
        dto.setEmail(entity.getEmail());
        dto.setCity(entity.getCity());
        dto.setStreet(entity.getStreet());
        dto.setHouse(entity.getHouse());
        dto.setFlat(entity.getFlat());
        dto.setLogin(entity.getLogin());
        dto.setPassword(entity.getPassword());
        dto.setIsAvailable(entity.getAvailable());
        dto.setUserRoleId(entity.getUserRole().getId());
        dto.setTruckingCompanyId(entity.getTruckingCompany().getId());
        dto.setTruckingCompanyName(entity.getTruckingCompany().getName());
        return dto;
    }
}
