package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class InvoiceProvider implements AbstractDataProvider {

    @Autowired
    private InvoiceService invoiceService;

    @Override
    public boolean provideGET(CustomUserDetails details, Long invoiceId) {
        UserRoleEnum role = details.getRole();
        //сисадмин и админ не имеют права
        if(role != UserRoleEnum.SYSTEM_ADMIN && role != UserRoleEnum.ADMIN) {
            //можно достать список для своей компании
            if(invoiceId == null) {
                return true;
            }
            //проверка на свою компанию
            Invoice invoice = invoiceService.securedFindOne(invoiceId);
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean providePOST(CustomUserDetails details, Long invoiceId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER) { //создает только диспетчер
            return true;
        }
        return false;
    }

    @Override
    public boolean providePUT(CustomUserDetails details, Long invoiceId) {
        if(invoiceId == null) { //обновить по нулевому нельзя
            return false;
        }
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER || role == UserRoleEnum.MANAGER || role == UserRoleEnum.DRIVER) {
            Invoice invoice = invoiceService.securedFindOne(invoiceId);
            if(invoice.getTruckingCompany().getId().equals(details.getTruckingCompanyId())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public boolean provideDELETE(CustomUserDetails details, Long invoiceId) {
        UserRoleEnum role = details.getRole();
        if(role == UserRoleEnum.DISPATCHER) {
            return true;
        }
        return false;
    }
}
