package com.itechart.trucking.security;

import com.itechart.trucking.security.detail.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Objects;

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {

    @Autowired
    private CustomPermissionsProvider provider;

    @Override
    public boolean hasPermission(Authentication auth, Object o, Object o1) {
        return false;
    }

    @Override
    public boolean hasPermission(Authentication auth, Serializable id, String target, Object permission) {
        CustomUserDetails details = (CustomUserDetails) auth.getPrincipal();
        if(Objects.equals(target, "Car")) {
            return provider.provideCarPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "CheckPoint")) {
            return provider.provideCheckPointPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "CustomerCompany")) {
            return provider.provideCustomerCompanyPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "Invoice")) {
            return provider.provideInvoicePermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "Product")) {
            return provider.provideProductPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "TruckingCompany")) {
            return provider.provideTruckingCompanyPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "User")) {
            return provider.provideUserPermission(details, (Long) id, (String) permission);
        }
        if(Objects.equals(target, "Waybill")) {
            return provider.provideWaybillPermission(details, (Long) id, (String) permission);
        }
        return false;
    }
}
