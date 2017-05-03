package com.itechart.entity;


import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="product_state")
public class ProductState implements Serializable {

    private Long idProductState;
    private String productStateDescription;

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

    @Column(name = "description", nullable = false)
    public String getProductStateDescription() {
        return productStateDescription;
    }

    public void setProductStateDescription(String productStateDescription) {
        this.productStateDescription = productStateDescription;
    }
}
