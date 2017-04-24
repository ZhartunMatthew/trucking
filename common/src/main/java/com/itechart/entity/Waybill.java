package com.itechart.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.*;


@Entity(name = "waybill")
public class Waybill implements Serializable {

    private static final long serialVersionUID = -5749235697982514914l;
    private Long IdWaybill;
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
    private String destinationeLatitude;
    private String destinationLongitude;
    private Invoice invoice;
    private Set<CheckPoint> checkPoints;

    public Waybill() {
    }


    @Id
    @Column(name = "id_waybill", nullable = false,updatable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getIdWaybill() {return IdWaybill;}

    public void setIdWaybill(Long idWaybill) {
        IdWaybill = idWaybill;
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
    public WaybillState getWaybillState() {return waybillState;}

    public void setWaybillState(WaybillState waybillState) {
        this.waybillState = waybillState;
    }


    @Column(name = "departure_date")
    public Date getDepartureDate() {return departureDate;}

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }


    @Column(name = "departure_city")
    public String getDepartureCity() {return departureCity;}

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }


    @Column(name = "departure_stree")
    public String getDepartureStreet() {return departureStreet;}

    public void setDepartureStreet(String departureStreet) {
        this.departureStreet = departureStreet;
    }


    @Column(name = "departure_house")
    public String getDepartureHouse() {return departureHouse;}

    public void setDepartureHouse(String departureHouse) {
        this.departureHouse = departureHouse;
    }


    @Column(name = "departure_latitude")
    public String getDepartureLatitude() {return departureLatitude;}

    public void setDepartureLatitude(String departureLatitude) {
        this.departureLatitude = departureLatitude;
    }


    @Column(name = "departure_longitude")
    public String getDepartureLongitude() {return departureLongitude;}

    public void setDepartureLongitude(String departureLongitude) {
        this.departureLongitude = departureLongitude;
    }


    @Column(name = "destination_date")
    public Date getDestinationDate() {return destinationDate;}

    public void setDestinationDate(Date destinationDate) {
        this.destinationDate = destinationDate;
    }


    @Column(name = "destination_city")
    public String getDestinationCity() {return destinationCity;}

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    @Column(name = "destination_street")
    public String getDestinationStreet() {return destinationStreet;}

    public void setDestinationStreet(String destinationStreet) {
        this.destinationStreet = destinationStreet;
    }


    @Column(name = "destination_house")
    public String getDestinationHouse() {return destinationHouse;}

    public void setDestinationHouse(String destinationHouse) {
        this.destinationHouse = destinationHouse;
    }


    @Column(name = "destinatione_latitude")
    public String getDestinationeLatitude() {return destinationeLatitude;}

    public void setDestinationeLatitude(String destinationeLatitude) {
        this.destinationeLatitude = destinationeLatitude;
    }


    @Column(name = "destination_longitude")
    public String getDestinationLongitude() {
        return destinationLongitude;
    }

    public void setDestinationLongitude(String destinationLongitude) {
        this.destinationLongitude = destinationLongitude;
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
    public Set<CheckPoint> getCheckPoints() {
        return checkPoints;
    }

    public void setCheckPoints(Set<CheckPoint> checkPoints) {
        this.checkPoints = checkPoints;
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
                ", TransportInvoice=" + invoice +
                ", checkPoints=" + checkPoints +
                '}';
    }
}





