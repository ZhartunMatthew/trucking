package com.itechart.trucking.entity;

import com.itechart.trucking.entity.enums.ProductStateEnum;

import javax.persistence.*;

@Entity(name = "product")
public class Product extends BaseEntity {

    private String name;
    private Integer amount;
    private ProductStateEnum productState;
    private Invoice invoice;

    public Product() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_product", nullable = false, insertable = true, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Enumerated(EnumType.STRING)
    public ProductStateEnum getProductState() {
        return productState;
    }

    public void setProductState(ProductStateEnum productState) {
        this.productState = productState;
    }

    @ManyToOne
    @JoinColumn(name = "invoice", nullable = false)
    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
}
