package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserProvider implements AbstractDataProvider {

    @Autowired
    private UserService userService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long userId) {
        UserRoleEnum role = details.getRole();
        //сисадмин не видит пользователей
        if(role != UserRoleEnum.SYSTEM_ADMIN) {
            if(userId == null) {
                return true;
            }
            //нельзя достать того, кого нет
            User user = userService.securedFindOne(userId);
            if(user == null || user.getUserRole() == UserRoleEnum.SYSTEM_ADMIN) {
                return false;
            }
            //можно достать только пользователей своей компании
            if(user.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long userId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.SYSTEM_ADMIN || role == UserRoleEnum.ADMIN) {
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long userId) {
        if(userId == null) {
            return false;
        }
        if(details.getRole() == UserRoleEnum.ADMIN) {
            return true;
        }
        if(details.getRole() == UserRoleEnum.DISPATCHER
                || details.getRole() == UserRoleEnum.DRIVER) {
            User user = userService.securedFindOne(userId);
            if(user == null) {
                return false;
            } else {
                if(details.getTruckingCompanyId().equals(user.getTruckingCompany().getId())) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long userId) {
        if(details.getRole() == UserRoleEnum.ADMIN) {
            return true;
        }
        return false;
    }
}
