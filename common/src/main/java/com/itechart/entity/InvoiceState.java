package com.itechart.entity;


import com.itechart.entity.enums.InvoiceStateEnum;

import javax.persistence.*;
import java.io.Serializable;

@Entity (name ="invoice_state")
public class InvoiceState implements Serializable {

    private Long idInvoiceState;
    private InvoiceStateEnum invoiceStateDescription;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "description", nullable = false)
    public InvoiceStateEnum getInvoiceStateDescription() {
        return invoiceStateDescription;
    }

    public void setInvoiceStateDescription(InvoiceStateEnum invoiceStateDescription) {
        this.invoiceStateDescription = invoiceStateDescription;
    }

}
