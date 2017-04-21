package com.itechart.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

/**
 * Created by Galina on 19.04.2017.
 */
@Entity(name = "check_point")
public class CheckPoint implements Serializable {

    private static final long serialVersionUID = -5748835697982515014l;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_checkpoint", nullable = false, updatable = false)
    private Long idCheckPoint;

    @Column(name = "description")
    private String description;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "path_date")
    private Date pathDate;

    @ManyToOne
    @JoinColumn(name = "id_way_bill", nullable = false)
    private Waybill waybill;

    public CheckPoint() {

    }

    @Override
    public String toString() {
        return "CheckPoint{" +
                "idCheckPoint=" + idCheckPoint +
                ", description='" + description + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", pathDate=" + pathDate +
                ", waybill=" + waybill +
                '}';
    }

    public Waybill getWaybill() {
        return waybill;
    }

    public void setWaybill(Waybill waybill) {
        this.waybill = waybill;
    }

    public Date getPathDate() {

        return pathDate;
    }

    public void setPathDate(Date pathDate) {
        this.pathDate = pathDate;
    }

    public String getLongitude() {

        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {

        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getDescription() {

        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getIdCheckPoint() {

        return idCheckPoint;
    }

    public void setIdCheckPoint(Long idCheckPoint) {
        this.idCheckPoint = idCheckPoint;
    }
}