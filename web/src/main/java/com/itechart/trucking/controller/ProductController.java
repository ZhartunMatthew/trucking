package com.itechart.trucking.controller;

import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll(@RequestParam(value = "invoice_id") Long invoiceId) {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<ProductDTO> dtos = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.DRIVER) {
            productService.findAllByInvoiceId(invoiceId).forEach(entity ->
                    dtos.add(conversionService.convert(entity, ProductDTO.class)));
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll(@RequestBody List<ProductDTO> products) {
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<ProductDTO> dtos = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.DRIVER) {
            products.forEach(product ->
                    productService.save(conversionService.convert(product, Product.class)));
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
