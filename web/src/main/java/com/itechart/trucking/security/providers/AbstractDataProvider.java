package com.itechart.trucking.security.providers;

import com.itechart.trucking.security.detail.CustomUserDetails;
import org.springframework.stereotype.Component;

@Component
public interface AbstractDataProvider {
    boolean provideGET(CustomUserDetails details, Long itemId);
    boolean providePOST(CustomUserDetails details, Long itemId);
    boolean providePUT(CustomUserDetails details, Long itemId);
    boolean provideDELETE(CustomUserDetails details, Long itemId);
}
