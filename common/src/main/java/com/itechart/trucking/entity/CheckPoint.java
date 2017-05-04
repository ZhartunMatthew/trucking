package com.itechart.trucking.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "check_point")
public class CheckPoint extends BaseEntity {

    private static final long serialVersionUID = -5748835697982515014l;
    private String description;
    private String latitude;
    private String longitude;
    private Date pathDate;
    private Waybill waybill;

    public CheckPoint() {
    }

    @ManyToOne
    @JoinColumn(name = "way_bill", nullable = false)
    public Waybill getWaybill() {
        return waybill;
    }

    public void setWaybill(Waybill waybill) {
        this.waybill = waybill;
    }

    @Column(name = "path_date")
    public Date getPathDate() {
        return pathDate;
    }

    public void setPathDate(Date pathDate) {
        this.pathDate = pathDate;
    }

    @Column(name = "longitude")
    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    @Column(name = "latitude")
    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_checkpoint", nullable = false, updatable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}