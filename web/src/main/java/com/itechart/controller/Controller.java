package com.itechart.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping("/")
    public String index() {
        return "Hi, dude!";
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Aloha!";
    }
}
