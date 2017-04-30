package com.itechart.controller;


import com.itechart.entity.TruckingCompany;
import com.itechart.entity.User;
import com.itechart.entity.UserRole;
import com.itechart.services.TruckingCompanyService;
import com.itechart.services.UserRoleService;
import com.itechart.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRoleService userRoleService;
    @Autowired
    private TruckingCompanyService truckingCompanyService;
    @ModelAttribute("user")
    public User getUser(){return new User();}


    @RequestMapping(value = "/show-users",method = RequestMethod.GET)
    public ModelAndView getUsers(){

        List<User> users = userService.findAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("users");
        modelAndView.addObject("users",users);
        return modelAndView;
    }


    @RequestMapping(value = "/edit-user{id}",method = RequestMethod.GET)
    public ModelAndView editUser(@PathVariable("id") long id){
        User user = userService.findOne(id);
        ModelAndView modelAndView = new ModelAndView();
        List<UserRole> userRoles = userRoleService.findAll();
        List<TruckingCompany> truckingCompanies = truckingCompanyService.findAll();
        modelAndView.setViewName("saveUser");
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("roles",userRoles);
        modelMap.put("user",user);
        modelMap.put("truckingCompanies",truckingCompanies);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }


    @RequestMapping(value = "/delete-user{id}",method = RequestMethod.GET)
    public String deleteUserById(@PathVariable("id") long id){
        userService.delete(id);
        return "redirect:/show-users";
    }


    @RequestMapping(value = "/add-user",method = RequestMethod.GET)
    public ModelAndView addUser(){
        ModelAndView modelAndView = new ModelAndView();
        List<UserRole> roles = userRoleService.findAll();
        List<TruckingCompany> truckingCompanies = truckingCompanyService.findAll();
        modelAndView.setViewName("saveUser");
        Map<String, Object> modelMap = new HashMap<>();
        modelMap.put("roles",roles);
        modelMap.put("truckingCompanies", truckingCompanies);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }


    @RequestMapping(value = "/save-user", method = RequestMethod.POST)
    public String insertUser(@Valid User user, BindingResult bindingResult, HttpServletRequest request){

        if (bindingResult.hasErrors())
        {
            List<UserRole> roles = userRoleService.findAll();
            List<TruckingCompany> truckingCompanies = truckingCompanyService.findAll();
            request.setAttribute("roles",roles);
            request.setAttribute("truckingCompanies", truckingCompanies);
            return "saveUser";
        }
        userService.save(user);
        return "redirect:/show-users";
    }
}
