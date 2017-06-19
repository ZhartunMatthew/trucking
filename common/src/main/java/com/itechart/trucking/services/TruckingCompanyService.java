package com.itechart.trucking.services;

import com.itechart.trucking.entity.TruckingCompany;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.repository.TruckingCompanyRepository;
import com.itechart.trucking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TruckingCompanyService {

    @Autowired
    private TruckingCompanyRepository truckingCompanyRepository;

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasPermission(null , 'TruckingCompany', 'GET')")
    @Transactional(readOnly = true)
    public List<TruckingCompany> findAll() {
        return truckingCompanyRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'TruckingCompany', 'GET')")
    @Transactional(readOnly = true)
    public TruckingCompany findOne(Long id) {
        return truckingCompanyRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'TruckingCompany', 'POST') or hasPermission(#truckingCompany.id, 'TruckingCompany', 'PUT')")
    @Transactional
    public TruckingCompany save(TruckingCompany truckingCompany) {
        return truckingCompanyRepository.saveAndFlush(truckingCompany);
    }

    @PreAuthorize("hasPermission(null, 'TruckingCompany', 'POST') or hasPermission(#truckingCompany.id, 'TruckingCompany', 'PUT')")
    @Transactional
    public TruckingCompany saveFullTruckingCompany(TruckingCompany truckingCompany) {
        userRepository.save(createAdminForTruckingCompany(truckingCompany));
        return truckingCompanyRepository.saveAndFlush(truckingCompany);
    }

    private User createAdminForTruckingCompany(TruckingCompany company) {
        User user = new User();
        user.setSurname("");
        user.setLogin("admin" + company.getTaxpayerNumber());
        user.setPassword(new BCryptPasswordEncoder().encode("admin"));
        user.setSalt("salt");
        user.setTruckingCompany(company);
        user.setUserRole(UserRoleEnum.ADMIN);
        return user;
    }

    public TruckingCompany securedFindOne(Long id) {
        return truckingCompanyRepository.findOne(id);
    }
}
