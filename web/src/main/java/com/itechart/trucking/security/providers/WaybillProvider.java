package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.Waybill;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.InvoiceService;
import com.itechart.trucking.services.WaybillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WaybillProvider implements AbstractDataProvider {

    @Autowired
    private WaybillService waybillService;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long waybillId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.MANAGER || role == UserRoleEnum.DRIVER) {
            if(waybillId == null) {
                return true;
            }
            //проверяем, что waybill принадлежит нашей компании
            Waybill waybill = waybillService.securedFindOne(waybillId);
            Invoice invoice = invoiceService.securedFindOne(waybill.getInvoice().getId());
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long waybillId) {
        if(details.getRole() == UserRoleEnum.MANAGER) {
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long waybillId) {
        if(waybillId == null) {
            return false;
        }
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.MANAGER || role == UserRoleEnum.DRIVER) {
            Waybill waybill = waybillService.securedFindOne(waybillId);
            Invoice invoice = invoiceService.securedFindOne(waybill.getInvoice().getId());
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long waybillId) {
        if(details.getRole() == UserRoleEnum.MANAGER) {
            return true;
        }
        return false;
    }

    public boolean provideGETbyTruckingId(CustomUserDetails details, Long truckingId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.MANAGER || role == UserRoleEnum.DRIVER) {
            if(truckingId == null) {
                return false;
            }
            if(truckingId.equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
