package com.itechart.trucking.controller;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.stringtemplate.v4.ST;
import org.stringtemplate.v4.STGroup;
import org.stringtemplate.v4.STGroupFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class CustomErrorController implements ErrorController {

    private static final String PATH = "/error";

    @Override
    public String getErrorPath() {
        return PATH;
    }

    @RequestMapping(value = PATH)
    public String error(HttpServletRequest request, HttpServletResponse response) {
        STGroup templateGroup = new STGroupFile("error-page.stg");
        ST errorPage =  templateGroup.getInstanceOf("error_page");
        Integer status = response.getStatus();
        if(status == 404) {
            return renderPage(errorPage, "404", "Requested page not found", "");
        } else {
            return renderPage(errorPage, status.toString(), "Something went wrong", "We are working on it");
        }
    }

    private String renderPage(ST template, String errorCode, String message, String label) {
        template.add("title", "Error page");
        template.add("status", errorCode);
        template.add("message", message);
        template.add("label", label);
        return template.render();
    }
}