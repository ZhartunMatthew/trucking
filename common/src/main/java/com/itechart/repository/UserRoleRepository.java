package com.itechart.repository;

import com.itechart.entity.UserRole;
import com.itechart.entity.enums.UserRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    public UserRole findByUserRoleDescription(UserRoleEnum description);
}
