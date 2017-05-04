package com.itechart.trucking.controller;


import com.itechart.trucking.entity.Car;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.User;
import com.itechart.trucking.services.CarService;
import com.itechart.trucking.services.InvoiceService;
import com.itechart.trucking.services.ProductService;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.*;

@Controller
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private ProductService productService;
    @Autowired
    private CarService carService;
    @Autowired
    private UserService userService;

    @ModelAttribute("invoice")
    public Invoice getInvoice()
    {
        return new Invoice();
    }

    @RequestMapping(value = "/invoiceList",method = RequestMethod.GET)
    public ModelAndView getInvoiceList(){

        List<Invoice> invoiceList = invoiceService.findAll();
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("invoiceList");
        modelAndView.addObject("invoiceList", invoiceList);
        return modelAndView;
    }

    @RequestMapping(value = "/deleteInvoice{id}",method = RequestMethod.POST)
    public String deleteInvoice(@PathVariable("id") long id){
        invoiceService.delete(id);
        return "redirect:/invoiceList";
    }

    @RequestMapping(value = "/updateInvoice{id}",method = RequestMethod.POST)
    public ModelAndView updateInvoice(@PathVariable("id") long id){
        Invoice invoice = invoiceService.findOne(id);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("updateInvoice");
        modelAndView.addObject("invoice", invoice);
        return modelAndView;
    }

    @RequestMapping(value = "/createInvoice",method = RequestMethod.GET)
    public ModelAndView createInvoice(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("createInvoice");
        Map<String, Object> modelMap = new HashMap<>();
        List<Car> availableCars = carService.findAvailable();
        //replace findByRole
        List<User> drivers = userService.findAll();
        modelMap.put("cars", availableCars);
        modelMap.put("drivers",drivers);
        modelAndView.addAllObjects(modelMap);
        return modelAndView;
    }

    @RequestMapping(value = "/saveInvoice", method = RequestMethod.POST)
    public String saveInvoice(@Valid Invoice invoice, HttpServletRequest request){

        Invoice savedInvoice = invoiceService.save(invoice);
        saveProducts(savedInvoice, request);
        return "redirect:/show-waybills";
    }

    private void saveProducts(Invoice invoice, HttpServletRequest request){
        Enumeration<String> paramNames = request.getParameterNames();
        List<Product> productList = new ArrayList<Product>();
        while(paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();

            Product product = new Product();
            /*parse request
            product.setName();
            product.setAmount();
            */
            productList.add(product);
        }
        productService.deleteAll();
        for (Product product : productList){
            productService.save(product);
        }
    }
}
