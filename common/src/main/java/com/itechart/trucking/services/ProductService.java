package com.itechart.trucking.services;

import com.itechart.trucking.entity.Product;
import com.itechart.trucking.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findOne(Long id) {
        return productRepository.findOne(id);
    }

    public void save(Product product) {
        productRepository.saveAndFlush(product);
    }

    public void delete(Long id) {
        productRepository.delete(id);
    }

    public void deleteAll() {
        productRepository.deleteAll();
    }

    public List<Product> findAllByInvoiceId(Long id) {
        return productRepository.findAllByInvoice_Id(id);
    }
}
