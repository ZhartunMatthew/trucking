package com.itechart.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "auto")
public class Auto implements Serializable {

    private Long id;
    private String number;
    private String brand;
    private String model;
    private Double fuelConsumption;
    private AutoType autoType;
    private Boolean isAvailable;
    private TruckingCompany truckingCompany;
    private Set<Invoice> invoices;

    public Auto() {
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auto", cascade = CascadeType.ALL)
    public Set<Invoice> getInvoices() {
        return invoices;
    }

    public void setInvoices(Set<Invoice> invoices) {
        this.invoices = invoices;
    }


    @ManyToOne
    @JoinColumn(name = "trucking_company", nullable = false)
    public TruckingCompany getTruckingCompany() {
        return truckingCompany;
    }

    public void setTruckingCompany(TruckingCompany truckingCompany) {
        this.truckingCompany = truckingCompany;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_auto", nullable = false, insertable = true, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "number")
    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @Column(name = "brand")
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Column(name = "model")
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Column(name = "fuel_consumption")
    public Double getFuelConsumption() {
        return fuelConsumption;
    }

    public void setFuelConsumption(Double fuelConsumption) {
        this.fuelConsumption = fuelConsumption;
    }

    @ManyToOne
    @JoinColumn(name = "auto_type", nullable = false)
    public AutoType getAutoType() {
        return autoType;
    }

    public void setAutoType(AutoType autoType) {
        this.autoType = autoType;
    }

    @Column(name = "is_available")
    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }

    @Override
    public String toString() {
        return "Auto{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", brand='" + brand + '\'' +
                ", model='" + model + '\'' +
                ", fuelConsumption=" + fuelConsumption +
                ", autoType=" + autoType +
                ", isAvailable=" + isAvailable +
                ", truckingCompany=" + truckingCompany +
                ", invoices=" + invoices +
                '}';
    }
}
