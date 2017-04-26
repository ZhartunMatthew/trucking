package com.itechart.services;

import com.itechart.entity.ProductState;
import com.itechart.entity.enums.ProductStateEnum;
import com.itechart.repository.ProductStateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
    public class ProductStateService {

    @Autowired
    private ProductStateRepository productStateRepository;

    public List<ProductState> findAll(){
        return productStateRepository.findAll();
    }

    public  ProductState findOne(Long id) {
        return productStateRepository.findOne(id);
    }

    public void save(ProductState product){
        productStateRepository.saveAndFlush(product);
    }

    public void delete(Long id){
        productStateRepository.delete(id);
    }

    public ProductState findByDescription(ProductStateEnum description) {
        return productStateRepository.findByProductStateDescription(description);
    }
}
