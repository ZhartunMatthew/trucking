package com.itechart.trucking.security;

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
        switch (action) {
            case "GET":
                return carProvider.provideGET(details, id);

            case "POST":
                return carProvider.providePOST(details, id);

            case "PUT":
                return carProvider.providePUT(details, id);

            case "DELETE":
                return carProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideCheckPointPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return checkPointProvider.provideGET(details, id);

            case "POST":
                return checkPointProvider.providePOST(details, id);

            case "PUT":
                return checkPointProvider.providePUT(details, id);

            case "DELETE":
                return checkPointProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideCustomerCompanyPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return customerCompanyProvider.provideGET(details, id);

            case "POST":
                return customerCompanyProvider.providePOST(details, id);

            case "PUT":
                return customerCompanyProvider.providePUT(details, id);

            case "DELETE":
                return customerCompanyProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideInvoicePermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return invoiceProvider.provideGET(details, id);

            case "POST":
                return invoiceProvider.providePOST(details, id);

            case "PUT":
                return invoiceProvider.providePUT(details, id);

            case "DELETE":
                return invoiceProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideProductPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return productProvider.provideGET(details, id);

            case "POST":
                return productProvider.providePOST(details, id);

            case "PUT":
                return productProvider.providePUT(details, id);

            case "DELETE":
                return productProvider.provideDELETE(details, id);

            case "GET_BY_INVOICE":
                return productProvider.provideGETbyInvoice(details, id);

            default:
                return false;
        }
    }

    public boolean provideTruckingCompanyPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return truckingCompanyProvider.provideGET(details, id);

            case "POST":
                return truckingCompanyProvider.providePOST(details, id);

            case "PUT":
                return truckingCompanyProvider.providePUT(details, id);

            case "DELETE":
                return truckingCompanyProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideUserPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return userProvider.provideGET(details, id);

            case "POST":
                return userProvider.providePOST(details, id);

            case "PUT":
                return userProvider.providePUT(details, id);

            case "DELETE":
                return userProvider.provideDELETE(details, id);

            default:
                return false;
        }
    }

    public boolean provideWaybillPermission(CustomUserDetails details, Long id, String action) {
        switch (action) {
            case "GET":
                return waybillProvider.provideGET(details, id);

            case "POST":
                return waybillProvider.providePOST(details, id);

            case "PUT":
                return waybillProvider.providePUT(details, id);

            case "DELETE":
                return waybillProvider.provideDELETE(details, id);

            case "GET_BY_TRUCKING_ID":
                return waybillProvider.provideGETbyTruckingId(details, id);

            case "GET_BY_DRIVER_ID":
                return waybillProvider.provideGETbyDriverId(details, id);

            default:
                return false;
        }
    }
}
