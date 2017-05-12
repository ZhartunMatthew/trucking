package com.itechart.trucking.security;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.providers.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CustomPermissionsProvider {

    @Autowired
    private CarProvider carProvider;

    @Autowired
    private CheckPointProvider checkPointProvider;

    @Autowired
    private CustomerCompanyProvider customerCompanyProvider;

    @Autowired
    private InvoiceProvider invoiceProvider;

    @Autowired
    private ProductProvider productProvider;

    @Autowired
    private TruckingCompanyProvider truckingCompanyProvider;

    @Autowired
    private UserProvider userProvider;

    @Autowired
    private WaybillProvider waybillProvider;

    public boolean provideCarPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return carProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return carProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return carProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return carProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideCheckPointPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return checkPointProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return checkPointProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return checkPointProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return checkPointProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideCustomerCompanyPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return customerCompanyProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return customerCompanyProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return customerCompanyProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return customerCompanyProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideInvoicePermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return invoiceProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return invoiceProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return invoiceProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return invoiceProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideProductPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return productProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return productProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return productProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return productProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideTruckingCompanyPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return truckingCompanyProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return truckingCompanyProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return truckingCompanyProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return truckingCompanyProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideUserPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return userProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return userProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return userProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return userProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }

    public boolean provideWaybillPermission(CustomUserDetails details, Long id, String action) {
        UserRoleEnum role = details.getRole();
        Long currentCompanyId = details.getTruckingCompanyId();
        switch (action) {
            case "GET":
                return waybillProvider.provideGET(role, currentCompanyId, id);

            case "POST":
                return waybillProvider.providePOST(role, currentCompanyId, id);

            case "PUT":
                return waybillProvider.providePUT(role, currentCompanyId, id);

            case "DELETE":
                return waybillProvider.provideDELETE(role, currentCompanyId, id);

            default:
                return false;
        }
    }
}
