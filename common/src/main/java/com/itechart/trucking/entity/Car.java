package com.itechart.trucking.entity;

import com.itechart.trucking.entity.enums.CarTypeEnum;

import javax.persistence.*;

@Entity
@Table(name = "car")
public class Car extends BaseEntity {

    private String number;
    private String brand;
    private String model;
    private Double fuelConsumption;
    private CarTypeEnum carType;
    private Boolean isAvailable;
    private TruckingCompany truckingCompany;

    public Car() {
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
    @Column(name = "id_car", nullable = false, insertable = true, updatable = false)
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

    @Enumerated(EnumType.STRING)
    public CarTypeEnum getCarType() {
        return carType;
    }

    public void setCarType(CarTypeEnum carType) {
        this.carType = carType;
    }

    @Column(name = "is_available")
    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }


}
