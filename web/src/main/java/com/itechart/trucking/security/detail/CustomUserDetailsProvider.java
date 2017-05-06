package com.itechart.trucking.security.detail;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CustomUserDetailsProvider {
    public static CustomUserDetails getUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(!(auth instanceof AnonymousAuthenticationToken)) {
            return (CustomUserDetails)
                    SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        return null;
    }
}
