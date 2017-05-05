package com.itechart.trucking.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "trucking_company")
public class TruckingCompany extends BaseEntity {

    private String name;
    private String taxpayerNumber;
    private String country;
    private String city;
    private String street;
    private String house;
    private List<Invoice> invoices;
    private List<User> users;
    private List<CustomerCompany> customerCompanies;
    private List<Car> cars;

    public TruckingCompany() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_trucking_company", nullable = false, insertable = true, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "taxpayer_number", nullable = false)
    public String getTaxpayerNumber() {
        return taxpayerNumber;
    }

    public void setTaxpayerNumber(String taxpayerNumber) {
        this.taxpayerNumber = taxpayerNumber;
    }

    @Column(name = "country")
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Column(name = "city")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "street")
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Column(name = "house")
    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public List<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(List<Invoice> invoices) {
        this.invoices = invoices;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public List<CustomerCompany> getCustomerCompanies() {
        return customerCompanies;
    }

    public void setCustomerCompanies(List<CustomerCompany> customerCompanies) {
        this.customerCompanies = customerCompanies;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public List<Car> getCars() {
        return cars;
    }

    public void setCars(List<Car> cars) {
        this.cars = cars;
    }
}
