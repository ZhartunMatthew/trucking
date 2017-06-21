package com.itechart.trucking.controller;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
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

import java.util.LinkedList;
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
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        UserRoleEnum roleEnum = details != null ? details.getRole() : null;
        LOGGER.info("Return usersRole {}", roleEnum);
        return new ResponseEntity<>(roleEnum, HttpStatus.OK);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List> findAll() {
        LOGGER.info("REST request. Path:/api/userRole/all  method: GET");
        List userRoles = new LinkedList();
        userRoles.add(UserRoleEnum.ADMIN);
        userRoles.add(UserRoleEnum.MANAGER);
        userRoles.add(UserRoleEnum.DISPATCHER);
        userRoles.add(UserRoleEnum.DRIVER);
        userRoles.add(UserRoleEnum.COMPANY_OWNER);
        LOGGER.info("Return usersRolesList.size={}", userRoles.size());
        return new ResponseEntity<>(userRoles, HttpStatus.OK);
    }

    @RequestMapping(value = "/current", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> getCurrentUser() {
        LOGGER.info("REST request. Path:/api/userRole/current  method: GET");
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        Long userId = details != null ? details.getId() : null;
        UserDTO user = userId != null ? conversionService.convert(userService.findOne(userId), UserDTO.class) : null;
        LOGGER.info("Return user {}", user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
