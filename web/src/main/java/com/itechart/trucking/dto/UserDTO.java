package com.itechart.trucking.dto;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ToString(callSuper = true)
@Component
public class UserDTO extends AbstractDTO {
    private String name;
    private String surname;
    private String patronymic;
    private String email;
    private String country;
    private String city;
    private String street;
    private String house;
    private String flat;
    private UserRoleEnum userRole;
    private String login;
    private String password;
    private String salt;
    private Long truckingCompanyId;
    private String truckingCompanyName;
    private Boolean isAvailable;
}
