package com.itechart.trucking.controller;

import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.UserRoleEnum;
import com.itechart.trucking.security.detail.CustomUserDetails;
import com.itechart.trucking.security.detail.CustomUserDetailsProvider;
import com.itechart.trucking.services.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Autowired
    private ConversionService conversionService;

    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> findAll(@RequestParam(value = "invoice_id") Long invoiceId) {
        LOGGER.info("REST request. Path:/api/product  method: GET. Invoice_id:{}", invoiceId);
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<ProductDTO> dtos = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            LOGGER.warn("Not found truckingCompany for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.DRIVER) {
            productService.findAllByInvoiceId(invoiceId).forEach(entity ->
                    dtos.add(conversionService.convert(entity, ProductDTO.class)));
            LOGGER.info("Return productList.size:{}", dtos.size());
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } else {
            LOGGER.warn("Permission denied for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<List<ProductDTO>> saveAll(@RequestBody List<ProductDTO> products) {
        LOGGER.info("REST request. Path:/api/product  method: PUT.");
        CustomUserDetails details = CustomUserDetailsProvider.getUserDetails();
        List<ProductDTO> dtos = new LinkedList<>();
        List<Product> tempList = new LinkedList<>();
        Long trId = details.getTruckingCompanyId();
        UserRoleEnum role = details.getRole();
        if(trId == null) {
            LOGGER.warn("Not found truckingCompany for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else if(role == UserRoleEnum.DRIVER) {
            products.forEach(product -> tempList.add(productService.save(conversionService.convert(product, Product.class))));
            tempList.forEach(product -> dtos.add(conversionService.convert(product, ProductDTO.class)));
            LOGGER.info("Return productList.size:{}", dtos.size());
            return new ResponseEntity<>(dtos, HttpStatus.OK);
        } else {
            LOGGER.warn("Permission denied for current user");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
