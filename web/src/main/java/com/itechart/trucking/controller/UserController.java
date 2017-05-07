package com.itechart.trucking.controller;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        UserDTO userDTO = conversionService.convert(userService.findOne(id), UserDTO.class);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }
}
