package com.itechart.trucking.services;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    @Transactional
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Transactional
    public void delete(Long id) {
        userRepository.delete(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> findByLogin(String login) {
        return Optional.ofNullable(userRepository.findUserByLogin(login));
    }
}
