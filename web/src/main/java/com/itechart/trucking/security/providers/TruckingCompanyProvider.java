package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import org.springframework.stereotype.Component;

@Component
public class TruckingCompanyProvider implements AbstractDataProvider {
    @Override
    public boolean provideGET(CustomUserDetails details, Long truckingCompanyId) {
        if(details.getRole() == UserRoleEnum.SYSTEM_ADMIN) {
            return true;
        } else {
            if(truckingCompanyId == null) {
                return false;
            } else {
                if(details.getTruckingCompanyId().equals(truckingCompanyId)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long truckingCompanyId) {
        if(details.getRole() == UserRoleEnum.SYSTEM_ADMIN) {
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long truckingCompanyId) {
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long truckingCompanyId) {
        return false;
    }
}
