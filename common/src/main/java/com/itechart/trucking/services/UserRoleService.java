package com.itechart.trucking.services;

import com.itechart.trucking.entity.UserRole;
import com.itechart.trucking.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
    public class UserRoleService {

    @Autowired
    private UserRoleRepository userRoleRepository;

    public List<UserRole> findAll(){
        return userRoleRepository.findAll();
    }

    public  UserRole findOne(Long id) {
        return userRoleRepository.findOne(id);
    }

    public void save(UserRole userRole){
        userRoleRepository.saveAndFlush(userRole);
    }

    public void delete(Long id){
        userRoleRepository.delete(id);
    }

}
