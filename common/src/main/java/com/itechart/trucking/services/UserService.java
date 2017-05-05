package com.itechart.trucking.services;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findOne(Long id) {
        return userRepository.findOne(id);
    }

    public void save(User user) {
        userRepository.saveAndFlush(user);
    }

    public void delete(Long id) {
        userRepository.delete(id);
    }

    public Optional<User> findByLogin(String login) {
        return Optional.ofNullable(userRepository.findUserByLogin(login));
    }
}
