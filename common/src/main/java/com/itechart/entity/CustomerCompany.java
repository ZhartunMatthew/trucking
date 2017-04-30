package com.itechart.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "customer_company")
public class CustomerCompany implements Serializable {

    private Long id;
    private String name;
    private String taxpayerNumber;
    private String country;
    private String city;
    private String street;
    private String house;
    private TruckingCompany truckingCompany;
    private Set<Invoice> invoeces;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_customer_company", nullable = false, insertable = true, updatable = false)
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

    @ManyToOne
    @JoinColumn(name = "trucking_company", nullable = false)
    public TruckingCompany getTruckingCompany() {
        return truckingCompany;
    }

    public void setTruckingCompany(TruckingCompany truckingCompany) {
        this.truckingCompany = truckingCompany;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customerCompany",cascade = CascadeType.ALL)
    public Set<Invoice> getInvoeces() {
        return invoeces;
    }

    public void setInvoeces(Set<Invoice> invoeces) {
        this.invoeces = invoeces;
    }
}
