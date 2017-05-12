package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.Car;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.services.TruckingCompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CarProvider implements AbstractDataProvider {

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    public boolean provideGET(UserRoleEnum role, Long companyId, Long carId) {
        if (role == UserRoleEnum.SYSTEM_ADMIN) {
            return false;
        }
        if (role == UserRoleEnum.ADMIN) {
            return true;
        }
        if (carId == null) {
            return true;
        } else {
            List<Car> cars = truckingCompanyService.findOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
            return false;
        }
    }

    public boolean providePOST(UserRoleEnum role, Long companyId, Long carId) {
        if (role == UserRoleEnum.ADMIN) {
            return true;
        }
        return false;
    }

    public boolean providePUT(UserRoleEnum role, Long companyId, Long carId) {
        if (role == UserRoleEnum.ADMIN) {
            List<Car> cars = truckingCompanyService.findOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean provideDELETE(UserRoleEnum role, Long companyId, Long carId) {
        if (role == UserRoleEnum.ADMIN) {
            List<Car> cars = truckingCompanyService.findOne(companyId).getCars();
            for (Car car : cars) {
                if (car.getId().equals(carId)) {
                    return true;
                }
            }
        }
        return false;
    }
}
