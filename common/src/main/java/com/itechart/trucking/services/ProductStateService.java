package com.itechart.trucking.services;

import com.itechart.trucking.entity.ProductState;
import com.itechart.trucking.repository.ProductStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ProductStateService {

    @Autowired
    private ProductStateRepository productStateRepository;

    public List<ProductState> findAll() {
        return productStateRepository.findAll();
    }

    public ProductState findOne(Long id) {
        return productStateRepository.findOne(id);
    }

    public void save(ProductState product) {
        productStateRepository.saveAndFlush(product);
    }

    public void delete(Long id) {
        productStateRepository.delete(id);
    }

}