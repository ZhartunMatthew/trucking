package com.itechart.trucking.security;

import com.itechart.trucking.dto.UserDTO;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.services.InvoiceService;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Component;

@Component
public class CustomPermissionsProvider {

    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private UserService userService;

    @Autowired
    private ConversionService conversionService;

    public boolean provideCarPermission(CustomUserDetails details, Long id) {
        System.out.println("CURRENT USER: " +
                conversionService.convert(userService.findOne(details.getId()), UserDTO.class));
        if(details.getRole() != UserRoleEnum.ADMIN) {
            return false;
        }
        return true;
    }

    public boolean provideCheckPointPermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideCustomerCompanyPermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideInvoicePermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideProductPermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideTruckingCompanyPermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideUserPermission(CustomUserDetails details, Long id) {
        return true;
    }

    public boolean provideWaybillPermission(CustomUserDetails details, Long id) {
        return true;
    }
}
