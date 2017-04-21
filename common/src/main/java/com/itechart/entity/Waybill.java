package com.itechart.entity; /**
 * Created by Galina on 18.04.2017.
 */

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.*;


@Entity(name = "waybill")
public class Waybill implements Serializable {

    private static final long serialVersionUID = -5749235697982514914l;

    @Id
    @Column(name = "id_waybill", nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long IdWaybill;

    @ManyToOne
    @JoinColumn(name = "waybill_state", nullable = true)
    private WaybillState waybillState;

    @Column(name = "departure_date")
    private Date departureDate;

    @Column(name = "departure_city")
    private String departureCity;

    @Column(name = "departure_stree")
    private String departureStreet;

    @Column(name = "departure_house")
    private String departureHouse;

    @Column(name = "departure_latitude")
    private String departureLatitude;

    @Column(name = "departure_longitude")
    private String departureLongitude;

    @Column(name = "destination_date")
    private Date destinationDate;

    @Column(name = "destination_city")
    private String destinationCity;

    @Column(name = "destination_street")
    private String destinationStreet;

    @Column(name = "destination_house")
    private String destinationHouse;

    @Column(name = "destinatione_latitude")
    private String destinationeLatitude;

    @Column(name = "destination_longitude")
    private String destinationLongitude;

    public Long getIdTransportInvoice() {
        return idTransportInvoice;
    }

    public void setIdTransportInvoice(Long idTransportInvoice) {
        this.idTransportInvoice = idTransportInvoice;
    }

    //@OneToOne
    @Column(name = "id_transport_invoice")
    private Long idTransportInvoice;

    @OneToMany/*(fetch = FetchType.LAZY, mappedBy = "waybill", cascade = CascadeType.ALL)*/
    private Set<CheckPoint> checkPoints;


    public Set<CheckPoint> getCheckPoints() {
        return checkPoints;
    }

    public void setCheckPoints(Set<CheckPoint> checkPoints) {
        this.checkPoints = checkPoints;
    }



    public Waybill() {
    }




    public String getDestinationeLatitude() {

        return destinationeLatitude;
    }

    public void setDestinationeLatitude(String destinationeLatitude) {
        this.destinationeLatitude = destinationeLatitude;
    }

    public String getDestinationHouse() {

        return destinationHouse;
    }

    public void setDestinationHouse(String destinationHouse) {
        this.destinationHouse = destinationHouse;
    }

    public String getDestinationStreet() {

        return destinationStreet;
    }

    public void setDestinationStreet(String destinationStreet) {
        this.destinationStreet = destinationStreet;
    }

    public String getDestinationCity() {

        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public Date getDestinationDate() {

        return destinationDate;
    }

    public void setDestinationDate(Date destinationDate) {
        this.destinationDate = destinationDate;
    }

    public String getDepartureLongitude() {

        return departureLongitude;
    }

    public void setDepartureLongitude(String departureLongitude) {
        this.departureLongitude = departureLongitude;
    }

    public String getDepartureLatitude() {

        return departureLatitude;
    }

    public void setDepartureLatitude(String departureLatitude) {
        this.departureLatitude = departureLatitude;
    }

    public String getDepartureHouse() {

        return departureHouse;
    }

    public void setDepartureHouse(String departureHouse) {
        this.departureHouse = departureHouse;
    }

    public String getDepartureStreet() {

        return departureStreet;
    }

    public void setDepartureStreet(String departureStreet) {
        this.departureStreet = departureStreet;
    }

    public String getDepartureCity() {

        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public Date getDepartureDate() {

        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public WaybillState getWaybillState() {

        return waybillState;
    }

    public void setWaybillState(WaybillState waybillState) {
        this.waybillState = waybillState;
    }

    public String getDestinationLongitude() {
        return destinationLongitude;
    }

    public void setDestinationLongitude(String destinationLongitude) {
        this.destinationLongitude = destinationLongitude;
    }

    public Long getIdWaybill() {

        return IdWaybill;
    }

    public void setIdWaybill(Long idWaybill) {
        IdWaybill = idWaybill;
    }

    @Override
    public String toString() {
        return "Waybill{" +
                "IdWaybill=" + IdWaybill +
                ", waybillState=" + waybillState +
                ", departureDate=" + departureDate +
                ", departureCity='" + departureCity + '\'' +
                ", departureStreet='" + departureStreet + '\'' +
                ", departureHouse='" + departureHouse + '\'' +
                ", departureLatitude='" + departureLatitude + '\'' +
                ", departureLongitude='" + departureLongitude + '\'' +
                ", destinationDate=" + destinationDate +
                ", destinationCity='" + destinationCity + '\'' +
                ", destinationStreet='" + destinationStreet + '\'' +
                ", destinationHouse='" + destinationHouse + '\'' +
                ", destinationeLatitude='" + destinationeLatitude + '\'' +
                ", destinationLongitude='" + destinationLongitude + '\'' +
                ", idTransportInvoice=" + idTransportInvoice +
                ", checkPoints=" + checkPoints +
                '}';
    }
}





