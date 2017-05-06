package com.itechart.trucking.entity;


import javax.persistence.*;

@Entity(name = "invoice_state")
public class InvoiceState extends BaseEntity {

    private String description;

    public InvoiceState() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_invoice_state", nullable = false, insertable = true, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
