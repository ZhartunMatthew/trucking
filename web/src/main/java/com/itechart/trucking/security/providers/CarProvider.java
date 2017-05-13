package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CarProvider implements AbstractDataProvider {

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    public boolean provideGET(CustomUserDetails details, Long carId) {
        UserRoleEnum role = details.getRole();
        Long companyId = details.getTruckingCompanyId();
        if (role == UserRoleEnum.SYSTEM_ADMIN) { //сисадмин не види машины
            return false;
        }
        if (carId == null) { //список машн своей компании можно всем
            return true;
        } else { //если достаем определенную машину, то проверяем, твоя ли это компания
            List<Car> cars = truckingCompanyService.securedFindOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
            return false;
        }
    }

    public boolean providePOST(CustomUserDetails details, Long carId) {
        UserRoleEnum role = details.getRole();
        if (role == UserRoleEnum.ADMIN) { //добавлять машины может только админ
            return true;
        }
        return false;
    }

    public boolean providePUT(CustomUserDetails details, Long carId) {
        if(carId == null) { //невозможно обновить машину с null id
            return false;
        }
        UserRoleEnum role = details.getRole();
        Long companyId = details.getTruckingCompanyId();
        if (role == UserRoleEnum.ADMIN) { //админ может обновить машину только своей компании
            List<Car> cars = truckingCompanyService.securedFindOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean provideDELETE(CustomUserDetails details, Long carId) {
        UserRoleEnum role = details.getRole();
        Long companyId = details.getTruckingCompanyId();
        if (role == UserRoleEnum.ADMIN) { //админ может удалить машину только своей компании
            List<Car> cars = truckingCompanyService.securedFindOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
        }
        return false;
    }
}
