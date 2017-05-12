package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import org.springframework.stereotype.Component;

@Component
public class UserProvider implements AbstractDataProvider {
    @Override
    public boolean provideGET(UserRoleEnum role, Long companyId, Long carId) {
        return false;
    }

    @Override
    public boolean providePOST(UserRoleEnum role, Long companyId, Long carId) {
        return false;
    }

    @Override
    public boolean providePUT(UserRoleEnum role, Long companyId, Long carId) {
        return false;
    }

    @Override
    public boolean provideDELETE(UserRoleEnum role, Long companyId, Long carId) {
        return false;
    }
}
