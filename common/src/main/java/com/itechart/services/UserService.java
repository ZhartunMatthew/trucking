package com.itechart.services;

import com.itechart.entity.User;
import com.itechart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public  User findOne(Long id) {
        return userRepository.findOne(id);
    }

    public void save(User user){
        userRepository.saveAndFlush(user);
    }

    public void delete(Long id){
        userRepository.delete(id);
    }

    public User findByLogin(String login) {
        return userRepository.findUserByLogin(login);
    }
}
