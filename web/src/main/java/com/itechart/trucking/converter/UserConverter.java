package com.itechart.trucking.converter;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.User;

public class UserConverter extends AbstractTwoWayConverter<UserDTO, User> {
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
        return dto;
    }
}
