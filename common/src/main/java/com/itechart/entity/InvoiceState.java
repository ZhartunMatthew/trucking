package com.itechart.entity;


import com.itechart.entity.enums.InvoiceStateEnum;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity (name ="invoice_state")
public class InvoiceState implements Serializable {

    private Long idInvoiceState;
    private InvoiceStateEnum invoiceStateDescription;
    private Set<Invoice> invoices;

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

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "invoiceState",cascade = CascadeType.ALL)
    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }

    @Override
    public String toString() {
        return "InvoiceState{" +
                "idInvoiceState=" + idInvoiceState +
                ", invoiceStateDescription=" + invoiceStateDescription +
                '}';
    }
}
