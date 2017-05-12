package com.itechart.trucking.security;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.providers.CarProvider;
import com.itechart.trucking.security.providers.CheckPointProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomPermissionsProvider {

    @Autowired
    private CarProvider carProvider;

    @Autowired
    private CheckPointProvider checkPointProvider;

    public boolean provideCarPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currTrId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return carProvider.provideGET(role, currTrId, id);

            case "POST":
                return carProvider.providePOST(role, currTrId, id);

            case "PUT":
                return carProvider.providePUT(role, currTrId, id);

            case "DELETE":
                return carProvider.provideDELETE(role, currTrId, id);

            default:
                return false;
        }
    }

    public boolean provideCheckPointPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currTrId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return checkPointProvider.provideGET(role, currTrId, id);

            case "POST":
                return checkPointProvider.providePOST(role, currTrId, id);

            case "PUT":
                return checkPointProvider.providePUT(role, currTrId, id);

            case "DELETE":
                return checkPointProvider.provideDELETE(role, currTrId, id);

            default:
                return false;
        }
    }

    public boolean provideCustomerCompanyPermission(CustomUserDetails details, Long id, String action) {
        return true;
    }

    public boolean provideInvoicePermission(CustomUserDetails details, Long id, String action) {
        return true;
    }

    public boolean provideProductPermission(CustomUserDetails details, Long id, String action) {
        return true;
    }

    public boolean provideTruckingCompanyPermission(CustomUserDetails details, Long id, String action) {
        return true;
    }

    public boolean provideUserPermission(CustomUserDetails details, Long id, String action) {
        return true;
    }

    public boolean provideWaybillPermission(CustomUserDetails details, Long id, String action) {
        return true;
    }
}
