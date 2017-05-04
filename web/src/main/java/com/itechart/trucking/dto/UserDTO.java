package com.itechart.trucking.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO extends AbstractDTO {
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String city;
    private String street;
    private String house;
    private String flat;
    private String role;
    private String login;
    private String password;
    private String truckingCompanyName;
    private Boolean isAvailable;
}
