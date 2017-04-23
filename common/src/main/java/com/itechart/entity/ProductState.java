package com.itechart.entity;


import com.itechart.entity.enums.ProductStateEnum;

import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="product_state")
public class ProductState implements Serializable {

    private Long idProductState;
    private ProductStateEnum productStateDescription;

    public ProductState(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_product_state", nullable = false, insertable = true, updatable = false)
    public Long getIdProductState() {
        return idProductState;
    }

    public void setIdProductState(Long idProductState) {
        this.idProductState = idProductState;
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "description", nullable = false)
    public ProductStateEnum getProductStateDescription() {
        return productStateDescription;
    }

    public void setProductStateDescription(ProductStateEnum productStateDescription) {
        this.productStateDescription = productStateDescription;
    }

    @Override
    public String toString() {
        return "ProductState{" +
                "idProductState=" + idProductState +
                ", productStateDescription=" + productStateDescription +
                '}';
    }
}
