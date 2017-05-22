package com.itechart.trucking.controller;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/api/userRole")
public class UserRoleController {

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserRoleEnum> getUserRole() {
        UserRoleEnum userRoleEnum = CustomUserDetailsProvider.getUserDetails().getRole();
        return new ResponseEntity<>(userRoleEnum, HttpStatus.OK);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List> findAll() {
        List usersRoles = Arrays.asList(UserRoleEnum.values());
        return new ResponseEntity<>(usersRoles, HttpStatus.OK);
    }
}
