package com.itechart.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Invoice implements Serializable {

    private Long idInvoice;
    private String invoiceNumber;
    private Date registerDate;
    private Date checkDate;
    private InvoiceState invoiceState;
    private CustomerCompany customerCompany;
    private TruckingCompany truckingCompany;
    private User dispatcherUser;
    private User managerUser;
    private User driverUser;
    private Auto auto;
    private Waybill waybill;

    private Set<Product> productSet = new HashSet<Product>();
    public Invoice() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_invoice", nullable = false, insertable = true, updatable = false)
    public Long getIdInvoice() {
        return idInvoice;
    }

    public void setIdInvoice(Long idInvoice) {
        this.idInvoice = idInvoice;
    }

    @Column(name = "invoice_number", nullable = false)
    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    @Column(name = "register_date", nullable = false, insertable = true, updatable = false)
    public Date getRegisterDate() {
        return registerDate;
    }

    public void setRegisterDate(Date registerDate) {
        this.registerDate = registerDate;
    }

    @Column(name = "check_date", nullable = true, insertable = true, updatable = false)
    public Date getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
    }

    @ManyToOne
    @JoinColumn(name = "invoice_state", nullable = false)
    public InvoiceState getInvoiceState() {
        return invoiceState;
    }

    public void setInvoiceState(InvoiceState invoiceState) {
        this.invoiceState = invoiceState;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "invoice", cascade = CascadeType.ALL)
    public Set<Product> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<Product> productSet) {
        this.productSet = productSet;
    }

    @ManyToOne
    @JoinColumn(name = "customer_company", nullable = false)
    public CustomerCompany getCustomerCompany() {
        return customerCompany;
    }

    public void setCustomerCompany(CustomerCompany customerCompany) {
        this.customerCompany = customerCompany;
    }

    @ManyToOne
    @JoinColumn(name = "dispatcher", nullable = false, insertable = false, updatable = false)
    public User getDispatcherUser() {
        return dispatcherUser;
    }

    public void setDispatcherUser(User dispatcherUser) {
        this.dispatcherUser = dispatcherUser;
    }

    @ManyToOne
    @JoinColumn(name = "manager", nullable = true,insertable = false, updatable = false)
    public User getManagerUser() {
        return managerUser;
    }

    public void setManagerUser(User managerUser) {
        this.managerUser = managerUser;
    }

    @ManyToOne
    @JoinColumn(name = "driver", nullable = false,insertable = false, updatable = false)
    public User getDriverUser() {
        return driverUser;
    }

    public void setDriverUser(User driverUser) {
        this.driverUser = driverUser;
    }

    @ManyToOne
    @JoinColumn(name = "auto", nullable = false)
    public Auto getAuto() {
        return auto;
    }

    public void setAuto(Auto auto) {
        this.auto = auto;
    }

    @ManyToOne
    @JoinColumn(name = "trucking_company", nullable = false)
    public TruckingCompany getTruckingCompany() {
        return truckingCompany;
    }

    public void setTruckingCompany(TruckingCompany truckingCompany) {
        this.truckingCompany = truckingCompany;
    }

    @OneToOne(mappedBy = "invoice")
    public Waybill getWaybill() {
        return waybill;
    }

    public void setWaybill(Waybill waybill) {
        this.waybill = waybill;
    }
}
