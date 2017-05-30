package com.itechart.trucking.entity;

import com.itechart.trucking.entity.enums.InvoiceStateEnum;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "invoice")
public class Invoice extends BaseEntity {

    private String invoiceNumber;
    private Date registerDate;
    private Date checkDate;
    private InvoiceStateEnum invoiceState;
    private CustomerCompany customerCompany;
    private TruckingCompany truckingCompany;
    private User dispatcherUser;
    private User managerUser;
    private User driverUser;
    private Car car;
    private Waybill waybill;
    private List<Product> products;

    public Invoice() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_invoice", nullable = false, insertable = true, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Column(name = "check_date", nullable = true, insertable = true, updatable = true)
    public Date getCheckDate() {
        return checkDate;
    }

    public void setCheckDate(Date checkDate) {
        this.checkDate = checkDate;
    }

    @Enumerated(EnumType.STRING)
    public InvoiceStateEnum getInvoiceState() {
        return invoiceState;
    }

    public void setInvoiceState(InvoiceStateEnum invoiceState) {
        this.invoiceState = invoiceState;
    }

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "invoice", cascade = CascadeType.ALL)
    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
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
    @JoinColumn(name = "dispatcher", nullable = false, insertable = true, updatable = false)
    public User getDispatcherUser() {
        return dispatcherUser;
    }

    public void setDispatcherUser(User dispatcherUser) {
        this.dispatcherUser = dispatcherUser;
    }

    @ManyToOne
    @JoinColumn(name = "manager", nullable = true, insertable = true, updatable = true)
    public User getManagerUser() {
        return managerUser;
    }

    public void setManagerUser(User managerUser) {
        this.managerUser = managerUser;
    }

    @ManyToOne
    @JoinColumn(name = "driver", nullable = false, insertable = true, updatable = false)
    public User getDriverUser() {
        return driverUser;
    }

    public void setDriverUser(User driverUser) {
        this.driverUser = driverUser;
    }

    @ManyToOne
    @JoinColumn(name = "car", nullable = false)
    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
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
