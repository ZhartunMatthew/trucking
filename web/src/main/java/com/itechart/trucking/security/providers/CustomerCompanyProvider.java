package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.CustomerCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomerCompanyProvider implements AbstractDataProvider {

    @Autowired
    private CustomerCompanyService customerCompanyService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long customerCompanyId) {
        UserRoleEnum role = details.getRole();
        if(role != UserRoleEnum.SYSTEM_ADMIN) { //сисадмин не может достать клиентов
            //можно достать список клиентов по id своей компании
            if(customerCompanyId == null) {
                return true;
            }
            CustomerCompany customerCompany = customerCompanyService.securedFindOne(customerCompanyId);
            if(customerCompany == null) { //нельзя достать компанию, которой нет
                return false;
            }
            //проверка на то, что клиентская компания пользуется именно твоей компание грузоперевозок
            if(customerCompany.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long customerCompanyId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.ADMIN) { //создает только админ
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long customerCompanyId) {
        if(customerCompanyId == null) { //нельзя обновить не существующую компанию
            return false;
        }
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.ADMIN) {
            CustomerCompany customerCompany = customerCompanyService.securedFindOne(customerCompanyId);
            //проверяем, что это твоя компания
            if(customerCompany.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long customerCompanyId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.ADMIN) { //удаляет только админ
            return true;
        }
        return false;
    }
}
