package com.itechart.trucking.security.detail;

import com.itechart.trucking.entity.User;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userService
                .findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User " + login + " not found"));

        return new CustomUserDetails(user);
    }
}
