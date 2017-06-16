package com.itechart.trucking.repository;

import com.itechart.trucking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByLogin(String login);

    List<User> findByAvailableTrueAndTruckingCompany_Id(Long id);

    Long countByTruckingCompany_Id(Long truckingCompanyId);

    List<User> findAllByTruckingCompany_Id(Long truckingCompanyId);
}
