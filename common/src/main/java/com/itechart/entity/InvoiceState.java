package com.itechart.entity;


import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="invoice_state")
public class InvoiceState implements Serializable {

    private Long idInvoiceState;
    private String invoiceStateDescription;

    public InvoiceState(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_invoice_state", nullable = false, insertable = true, updatable = false)
    public Long getIdInvoiceState() {
        return idInvoiceState;
    }

    public void setIdInvoiceState(Long idInvoiceState) {
        this.idInvoiceState = idInvoiceState;
    }

    @Column(name = "description", nullable = false)
    public String getInvoiceStateDescription() {
        return invoiceStateDescription;
    }

    public void setInvoiceStateDescription(String invoiceStateDescription) {
        this.invoiceStateDescription = invoiceStateDescription;
    }
}
