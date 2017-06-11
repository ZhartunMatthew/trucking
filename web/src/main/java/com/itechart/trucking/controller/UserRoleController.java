package com.itechart.trucking.controller;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(value = "/api/userRole")
public class UserRoleController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserRoleController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserRoleEnum> getUserRole() {
        LOGGER.info("REST request. Path:/api/userRole  method: GET");
        UserRoleEnum userRoleEnum = CustomUserDetailsProvider.getUserDetails().getRole();
        LOGGER.info("Return usersRole {}", userRoleEnum);
        return new ResponseEntity<>(userRoleEnum, HttpStatus.OK);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List> findAll() {
        LOGGER.info("REST request. Path:/api/userRole/all  method: GET");
        List usersRoles = Arrays.asList(UserRoleEnum.values());
        LOGGER.info("Return usersRolesList.size={}", usersRoles.size());
        return new ResponseEntity<>(usersRoles, HttpStatus.OK);
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> getCurrentUser() {
        LOGGER.info("REST request. Path:/api/userRole/current  method: GET");
        Long userId = CustomUserDetailsProvider.getUserDetails().getId();
        UserDTO user = conversionService.convert(userService.findOne(userId), UserDTO.class);
        LOGGER.info("Return user {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
