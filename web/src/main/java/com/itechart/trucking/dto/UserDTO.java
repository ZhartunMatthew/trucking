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
    private Long userRoleId;
    private String login;
    private String password;
    private Long truckingCompanyId;
    private String truckingCompanyName;
    private Boolean isAvailable;
}
