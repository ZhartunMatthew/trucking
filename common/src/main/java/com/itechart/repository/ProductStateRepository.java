package com.itechart.repository;

import com.itechart.entity.ProductState;
import com.itechart.entity.enums.ProductStateEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductStateRepository extends JpaRepository<ProductState, Long> {

    public ProductState findByProductStateDescription(ProductStateEnum description);
}
