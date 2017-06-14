package com.itechart.trucking.repository;

import com.itechart.trucking.entity.Product;
import com.itechart.trucking.entity.enums.ProductStateEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByInvoice_Id(Long id);

    Long countByProductStateAndInvoice_TruckingCompany_Id(ProductStateEnum state, Long id);

    List<Product> findByInvoice_TruckingCompany_Id(Long Id);
}
