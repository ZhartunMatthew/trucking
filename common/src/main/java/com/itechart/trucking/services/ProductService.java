package com.itechart.trucking.services;

import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import com.itechart.trucking.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @PreAuthorize("hasPermission(#id, 'Product', 'GET')")
    @Transactional(readOnly = true)
    public Product findOne(Long id) {
        return productRepository.findOne(id);
    }

    @PreAuthorize("hasPermission(null, 'Product', 'POST') or hasPermission(#product.id, 'Product', 'PUT')")
    @Transactional
    public Product save(Product product) {
        return productRepository.saveAndFlush(product);
    }

    @PreAuthorize("hasPermission(#id, 'Product', 'DELETE')")
    @Transactional
    public void delete(Long id) {
        productRepository.delete(id);
    }

    @PreAuthorize("hasPermission(#id, 'Product', 'GET_BY_INVOICE')")
    @Transactional(readOnly = true)
    public List<Product> findAllByInvoiceId(Long id) {
        return productRepository.findAllByInvoice_Id(id);
    }

    @PreAuthorize("hasAnyRole('DISPATCHER', 'MANAGER', 'DRIVER', 'COMPANY_OWNER')")
    @Transactional
    public Product securedFindOne(Long id) {
        return productRepository.findOne(id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    @Transactional(readOnly = true)
    public List<Product> findAllByState(ProductStateEnum state, Long id) {
        return productRepository.findAllByProductStateAndInvoice_TruckingCompany_Id(state, id);
    }

    @PreAuthorize("hasAnyRole('COMPANY_OWNER')")
    @Transactional(readOnly = true)
    public List<Product> FindAll(Long id) {
        return productRepository.findByInvoice_TruckingCompany_Id(id);
    }
}
