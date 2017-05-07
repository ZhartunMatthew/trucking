package com.itechart.trucking.controller;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        UserDTO userDTO = conversionService.convert(userService.findOne(id), UserDTO.class);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<UserDTO>> findAll() {
        List<User> users = userService.findAll();
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users){
            UserDTO userDTO = conversionService.convert(user, UserDTO.class);
            userDTOs.add(userDTO);
        }
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        User userEntity = userService.save(conversionService.convert(userDTO, User.class));
        UserDTO resultUser = conversionService.convert(userEntity, UserDTO.class);
        return new ResponseEntity<>(resultUser, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO) {
        User userEntity = userService.save(conversionService.convert(userDTO, User.class));
        UserDTO resultUser = conversionService.convert(userEntity, UserDTO.class);
        return new ResponseEntity<>(resultUser,HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
