package com.itechart.trucking.services;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @PreAuthorize("hasPermission(null, 'User', 'GET')")
    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @PreAuthorize("hasPermission(#id, 'User', 'GET')")
    @Transactional(readOnly = true)
    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'User', 'POST') or hasPermission(#user.id, 'User', 'PUT')")
    @Transactional
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @PreAuthorize("hasPermission(#id, 'User', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByLogin(String login) {
        return Optional.ofNullable(userRepository.findUserByLogin(login));
    }

    @PreAuthorize("hasPermission(null, 'User', 'GET')")
    @Transactional(readOnly = true)
    public List<User> findAvailable(Long truckingCompanyId) {
        return userRepository.findByAvailableTrueAndTruckingCompany_Id(truckingCompanyId);
    }

    @PreAuthorize("hasAnyRole('SYSTEM_ADMIN', 'ADMIN', 'DISPATCHER', 'MANAGER', 'DRIVER', 'COMPANY_OWNER')")
    public User securedFindOne(Long id) {
        return userRepository.findOne(id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    @Transactional
    public Long count(Long truckingCompanyId) {
        return userRepository.countByTruckingCompany_Id(truckingCompanyId);
    }

    @PreAuthorize("hasPermission(null, 'User', 'GET')")
    public List<User> findByTruckingCompanyId(Long id) {
        return userRepository.findAllByTruckingCompany_Id(id);
    }
}
