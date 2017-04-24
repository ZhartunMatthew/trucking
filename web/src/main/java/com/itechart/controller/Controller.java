package com.itechart.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Aloha!";
    }
}
