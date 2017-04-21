package com.itechart.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Product implements Serializable {

    private Long idProduct;
    private String name;
    private Integer amount;
    private ProductState productState;

    private Invoice invoice;

    public Product() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_product", nullable = false, insertable = true, updatable = false)
    public Long getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Long idProduct) {
        this.idProduct = idProduct;
    }

    @Column(name = "name", nullable = false, insertable = true, updatable = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "amount", nullable = false, insertable = true, updatable = true)
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @ManyToOne
    @JoinColumn(name = "product_state", nullable = false)
    public ProductState getProductState() {
        return productState;
    }

    public void setProductState(ProductState productState) {
        this.productState = productState;
    }

    @ManyToOne
    @JoinColumn(name = "id_invoice", nullable = false)
    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
}
