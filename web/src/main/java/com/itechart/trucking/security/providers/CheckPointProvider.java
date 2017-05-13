package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.CheckPoint;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.CheckPointService;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class CheckPointProvider implements AbstractDataProvider {

    @Autowired
    private CheckPointService checkPointService;

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long waybillId) {
        UserRoleEnum role = details.getRole();
        Long companyId = details.getTruckingCompanyId();
        if(waybillId != null) { //нельзя достать все подряд пойнты, они достаются по id waybill
            if(role == UserRoleEnum.DRIVER || role == UserRoleEnum.MANAGER) {
                //достать может только админ или менеджер и только с проверкой на свою компанию
                Invoice invoice = invoiceService.findByWaybillId(waybillId);
                if(Objects.equals(invoice.getTruckingCompany().getId(), companyId)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long checkPointId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.MANAGER) { //создает только менеджер
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long checkPointId) {
        if(checkPointId == null) { //нельзя обновить с нулевым id
            return false;
        }
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DRIVER) { // обновлять может только водитель с проверкой на его waybill
            Long currentUserId = details.getId();
            CheckPoint checkPoint = checkPointService.securedFindOne(checkPointId);
            Invoice invoice = invoiceService.findByWaybillId(checkPoint.getWaybill().getId());
            if(invoice.getDriverUser().getId().equals(currentUserId)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long checkPointId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.MANAGER) { //удаляет только менеджер
            return true;
        }
        return false;
    }
}
