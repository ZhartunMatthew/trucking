package com.itechart.trucking.controller;

import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ReportController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(Model model) {
        model.addAttribute("users", userService.findAll());
    }


}
