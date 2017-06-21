package com.itechart.trucking.converter;

import com.itechart.trucking.dto.InvoiceDTO;
import com.itechart.trucking.dto.ProductDTO;
import com.itechart.trucking.entity.CustomerCompany;
import com.itechart.trucking.entity.Invoice;
import com.itechart.trucking.entity.Product;
import com.itechart.trucking.services.CarService;
import com.itechart.trucking.services.CustomerCompanyService;
import com.itechart.trucking.services.TruckingCompanyService;
import com.itechart.trucking.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InvoiceConverter extends AbstractTwoWayConverter<InvoiceDTO, Invoice> {

    @Autowired
    private CustomerCompanyService customerCompanyService;

    @Autowired
    private TruckingCompanyService truckingCompanyService;

    @Autowired
    private UserService userService;

    @Autowired
    private CarService carService;

    @Autowired
    private ProductConverter productConverter;

    @Override
    protected Invoice convert(InvoiceDTO dto) {
        Invoice entity = new Invoice();
        entity.setId(dto.getId());
        entity.setInvoiceNumber(dto.getNumber());
        entity.setRegisterDate(dto.getRegisterDate());
        entity.setCheckDate(dto.getCheckDate());
        entity.setInvoiceState(dto.getInvoiceState());
        List<Product> products = new ArrayList<>();
        for (ProductDTO productDTO : dto.getProducts()) {
            Product product = productConverter.convert(productDTO);
            product.setInvoice(entity);
            products.add(product);
        }
        entity.setProducts(products);
        CustomerCompany customerCompany = customerCompanyService.findOne(dto.getCustomerCompanyId());
        entity.setCustomerCompany(customerCompany);
        CustomerCompany destinationCustomerCompany
                = customerCompanyService.findOne(dto.getDestinationCustomerCompanyId());
        entity.setDestinationCustomerCompany(destinationCustomerCompany);
        entity.setTruckingCompany(truckingCompanyService.findOne(dto.getTruckingCompanyId()));
        entity.setDriverUser(userService.findOne(dto.getDriverId()));
        if(dto.getManagerId() != null) {
            entity.setManagerUser(userService.findOne(dto.getManagerId()));
        }
        entity.setDispatcherUser(userService.findOne(dto.getDispatcherId()));
        entity.setCar(carService.findOne(dto.getCarId()));
        return entity;
    }

    @Override
    protected InvoiceDTO convertBack(Invoice entity) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.setId(entity.getId());
        dto.setNumber(entity.getInvoiceNumber());
        dto.setRegisterDate(entity.getRegisterDate());
        dto.setCheckDate(entity.getCheckDate());
        dto.setInvoiceState(entity.getInvoiceState());
        dto.setCustomerCompanyId(entity.getCustomerCompany().getId());
        dto.setCustomerCompany(entity.getCustomerCompany().getName());
        dto.setDestinationCustomerCompanyId(entity.getDestinationCustomerCompany().getId());
        dto.setDestinationCustomerCompany(entity.getDestinationCustomerCompany().getName());
        dto.setTruckingCompanyId(entity.getTruckingCompany().getId());
        dto.setTruckingCompany(entity.getTruckingCompany().getName());
        dto.setDriverId(entity.getDriverUser().getId());
        String fullName = entity.getDriverUser().getSurname() + ' '
                + entity.getDriverUser().getName() + ' '
                + entity.getDriverUser().getPatronymic();
        dto.setDriverFullName(fullName);
        if(entity.getManagerUser() != null) {
            dto.setManagerId(entity.getManagerUser().getId());
        }
        dto.setDispatcherId(entity.getDispatcherUser().getId());
        dto.setCarId(entity.getCar().getId());
        List<ProductDTO> productDTOs = new ArrayList<>();
        for (Product product : entity.getProducts()) {
            ProductDTO productDTO = productConverter.convertBack(product);
            productDTO.setInvoiceId(entity.getId());
            productDTOs.add(productDTO);
        }
        dto.setProducts(productDTOs);
        return dto;
    }
}
