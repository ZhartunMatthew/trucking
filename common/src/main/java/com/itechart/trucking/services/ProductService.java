package com.itechart.trucking.services;

import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import com.itechart.trucking.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @PreAuthorize("hasPermission(#id, 'Product', 'GET')")
    public Product findOne(Long id) {
        return productRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Product', 'POST') or hasPermission(#product.id, 'Product', 'PUT')")
    public Product save(Product product) {
        return productRepository.saveAndFlush(product);
    }

    @PreAuthorize("hasPermission(#id, 'Product', 'DELETE')")
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @PreAuthorize("hasPermission(#id, 'Product', 'GET_BY_INVOICE')")
    public List<Product> findAllByInvoiceId(Long id) {
        return productRepository.findAllByInvoice_Id(id);
    }

    @PreAuthorize("hasAnyRole('DISPATCHER', 'MANAGER', 'DRIVER', 'COMPANY_OWNER')")
    public Product securedFindOne(Long id) {
        return productRepository.findOne(id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    public Long count(ProductStateEnum state, Long id) {
        return productRepository.countByProductStateAndInvoice_TruckingCompany_Id(state, id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    public List<Product> FindAll(Long id) {
        return productRepository.findByInvoice_TruckingCompany_Id(id);
    }
}
