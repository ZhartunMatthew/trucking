package com.itechart.trucking.entity;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "waybill")
public class Waybill extends BaseEntity {

    private String waybillNumber;
    private WaybillState waybillState;
    private Date departureDate;
    private String departureCity;
    private String departureStreet;
    private String departureHouse;
    private String departureLatitude;
    private String departureLongitude;
    private Date destinationDate;
    private String destinationCity;
    private String destinationStreet;
    private String destinationHouse;
    private String destinationLatitude;
    private String destinationLongitude;
    private Invoice invoice;
    private List<CheckPoint> checkPoints;
    private Double price;
    private Double totalDistance;

    public Waybill() {
    }

    @Id
    @Column(name = "id_waybill", nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "waybill_number")
    public String getWaybillNumber() {
        return waybillNumber;
    }

    public void setWaybillNumber(String waybillNumber) {
        this.waybillNumber = waybillNumber;
    }

    @ManyToOne
    @JoinColumn(name = "waybill_state", nullable = false)
    public WaybillState getWaybillState() {
        return waybillState;
    }

    public void setWaybillState(WaybillState waybillState) {
        this.waybillState = waybillState;
    }

    @Column(name = "departure_date")
    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    @Column(name = "departure_city")
    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    @Column(name = "departure_stree")
    public String getDepartureStreet() {
        return departureStreet;
    }

    public void setDepartureStreet(String departureStreet) {
        this.departureStreet = departureStreet;
    }

    @Column(name = "departure_house")
    public String getDepartureHouse() {
        return departureHouse;
    }

    public void setDepartureHouse(String departureHouse) {
        this.departureHouse = departureHouse;
    }

    @Column(name = "departure_latitude")
    public String getDepartureLatitude() {
        return departureLatitude;
    }

    public void setDepartureLatitude(String departureLatitude) {
        this.departureLatitude = departureLatitude;
    }

    @Column(name = "departure_longitude")
    public String getDepartureLongitude() {
        return departureLongitude;
    }

    public void setDepartureLongitude(String departureLongitude) {
        this.departureLongitude = departureLongitude;
    }

    @Column(name = "destination_date")
    public Date getDestinationDate() {
        return destinationDate;
    }

    public void setDestinationDate(Date destinationDate) {
        this.destinationDate = destinationDate;
    }

    @Column(name = "destination_city")
    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    @Column(name = "destination_street")
    public String getDestinationStreet() {
        return destinationStreet;
    }

    public void setDestinationStreet(String destinationStreet) {
        this.destinationStreet = destinationStreet;
    }


    @Column(name = "destination_house")
    public String getDestinationHouse() {
        return destinationHouse;
    }

    public void setDestinationHouse(String destinationHouse) {
        this.destinationHouse = destinationHouse;
    }

    @Column(name = "destinatione_latitude")
    public String getDestinationLatitude() {
        return destinationLatitude;
    }

    public void setDestinationLatitude(String destinationLatitude) {
        this.destinationLatitude = destinationLatitude;
    }

    @Column(name = "destination_longitude")
    public String getDestinationLongitude() {
        return destinationLongitude;
    }

    public void setDestinationLongitude(String destinationLongitude) {
        this.destinationLongitude = destinationLongitude;
    }

    @Column (name = "price")
    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Column (name = "total_distance")
    public Double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(Double totalDistance) {
        this.totalDistance = totalDistance;
    }

    @OneToOne
    @JoinColumn(name = "id_invoice")
    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "waybill", cascade = CascadeType.ALL)
    public List<CheckPoint> getCheckPoints() {
        return checkPoints;
    }

    public void setCheckPoints(List<CheckPoint> checkPoints) {
        this.checkPoints = checkPoints;
    }


}





