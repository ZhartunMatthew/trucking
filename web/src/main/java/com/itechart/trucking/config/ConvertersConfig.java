package com.itechart.trucking.config;

import com.itechart.trucking.converter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;

@Configuration
@ComponentScan
public class ConvertersConfig {

    @Autowired
    private CarConverter carConverter;

    @Autowired
    private CustomerCompanyConverter customerCompanyConverter;

    @Autowired
    private TruckingCompanyConverter truckingCompanyConverter;

    @Autowired
    private InvoiceConverter invoiceConverter;

    @Autowired
    private ProductConverter productConverter;

    @Autowired
    private UserConverter userConverter;

    @Autowired
    private WaybillConverter waybillConverter;

    @Autowired
    private CheckPointConverter checkPointConverter;

    public ConversionService conversionService() {
        DefaultConversionService service = new DefaultConversionService();
        service.addConverter(productConverter);
        service.addConverter(invoiceConverter);
        service.addConverter(customerCompanyConverter);
        service.addConverter(carConverter);
        service.addConverter(waybillConverter);
        service.addConverter(userConverter);
        service.addConverter(truckingCompanyConverter);
        service.addConverter(checkPointConverter);
        return service;
    }
}
