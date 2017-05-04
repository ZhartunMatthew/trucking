package com.itechart.trucking.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "trucking_company")
public class TruckingCompany implements Serializable {

    private Long id;
    private String name;
    private String taxpayerNumber;
    private String country;
    private String city;
    private String street;
    private String house;
    private Set<Invoice> invoices;
    private Set<User> users;
    private Set<CustomerCompany> customerCompanies;
    private Set<Car> cars;
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
    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public Set<CustomerCompany> getCustomerCompanies() {
        return customerCompanies;
    }

    public void setCustomerCompanies(Set<CustomerCompany> customerCompanies) {
        this.customerCompanies = customerCompanies;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "truckingCompany", cascade = CascadeType.ALL)
    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }
}
