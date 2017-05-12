package com.itechart.trucking.security.providers;

import com.itechart.trucking.entity.enums.UserRoleEnum;
import org.springframework.stereotype.Component;

@Component
public interface AbstractDataProvider {
    boolean provideGET(UserRoleEnum role, Long trId, Long carId);
    boolean providePOST(UserRoleEnum role, Long trId, Long carId);
    boolean providePUT(UserRoleEnum role, Long trId, Long carId);
    boolean provideDELETE(UserRoleEnum role, Long trId, Long carId);
}
