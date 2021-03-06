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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/user")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/user{}  method: GET", id);
        UserDTO userDTO = conversionService.convert(userService.findOne(id), UserDTO.class);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<UserDTO>> findAll() {
        LOGGER.info("REST request. Path:/api/user  method: GET");
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        List<User> users = truckingCompanyId == null
                ? userService.findAll() : userService.findByTruckingCompanyId(truckingCompanyId);

        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users){
            UserDTO userDTO = conversionService.convert(user, UserDTO.class);
            userDTOs.add(userDTO);
        }
        LOGGER.info("Return userList.size:{}", userDTOs.size());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "/freeDrivers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<UserDTO>> findFreeDrivers() {
        LOGGER.info("REST request. Path:/api/freeDrivers  method: GET");
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        List<User> users = userService.findAvailable(truckingCompanyId);
        List<UserDTO> userDTOs = new ArrayList<>();
        for (User user : users){
            UserDTO userDTO = conversionService.convert(user, UserDTO.class);
            userDTOs.add(userDTO);
        }
        LOGGER.info("Return userList.size:{}", userDTOs.size());
        return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        LOGGER.info("REST request. Path:/api/user  method: POST. user: {}", userDTO);
        if(userService.findByLogin(userDTO.getLogin()).isPresent()) {
            return new ResponseEntity<>(userDTO, HttpStatus.CONFLICT);
        }
        userDTO.setSalt("qqqqqqqq");
        userDTO.setPassword(new BCryptPasswordEncoder().encode(userDTO.getPassword()));
        Long truckingCompanyId = CustomUserDetailsProvider.getUserDetails().getTruckingCompanyId();
        userDTO.setTruckingCompanyId(truckingCompanyId);
        if (userDTO.getUserRole().equals(UserRoleEnum.DRIVER)){
            userDTO.setIsAvailable(true);
        } else {
            userDTO.setIsAvailable(null);
        }
        User userEntity = userService.save(conversionService.convert(userDTO, User.class));
        UserDTO resultUser = conversionService.convert(userEntity, UserDTO.class);
        return new ResponseEntity<>(resultUser, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        LOGGER.info("REST request. Path:/api/user/{}  method: PUT.  userInfo: {}", id, userDTO);
        Optional<User> tempUser = userService.findByLogin(userDTO.getLogin());
        if(tempUser.isPresent()) {
            if(!tempUser.get().getId().equals(userDTO.getId())) {
                return new ResponseEntity<>(userDTO, HttpStatus.CONFLICT);
            }
        }
        User userEntity = userService.save(conversionService.convert(userDTO, User.class));
        UserDTO resultUser = conversionService.convert(userEntity, UserDTO.class);
        return new ResponseEntity<>(resultUser, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        LOGGER.info("REST request. Path:/api/user/{}  method: DELETE.", id);
        userService.delete(id);
    }
}
