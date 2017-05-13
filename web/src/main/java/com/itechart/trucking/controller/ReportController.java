package com.itechart.trucking.controller;

import com.itechart.trucking.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/report")
public class ReportController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReportController.class);

    @Autowired
    UserService userService;

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void download(Model model) {
        LOGGER.info("Path:/report/download  method: GET");
        model.addAttribute("users", userService.findAll());
    }
}
