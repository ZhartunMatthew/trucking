package com.itechart.trucking.entity;



import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;


@Entity
public class User implements Serializable {

    private Long idUser;

    @NotNull(message = "name can not be null")
    @Size(min = 1,max = 30,message = "the lenght should be between 1 and 30")
    private String name;

    @NotNull(message = "surname can not be null")
    @Size(min = 1,max = 30,message = "the lenght should be between 1 and 30")
    private String surname;


    @Size(min = 1,max = 30,message = "the lenght should be between 1 and 30")
    private String patronymic;

    @Email(message = "email is not in the correct format")
    private String email;

    @NotNull(message = "city can not be null")
    @Size(min = 1,max = 30,message = "the lenght should be between 1 and 30")
    private String city;

    @NotNull(message = "street can not be null")
    @Size(min = 1,max = 30,message = "the lenght should be between 1 and 30")
    private String street;

    @NotNull(message = "house can not be null")
    @Size(min = 1,max = 10,message = "the lenght should be between 1 and 10")
    private String house;

    @NotNull(message = "flat can not be null")
    @Size(min = 1,max = 10,message = "the lenght should be between 1 and 10")
    private String flat;

    private UserRole userRole;
    private String login;

    @NotNull(message = "password can not be null")
    private String password;

    private String salt;
    private TruckingCompany truckingCompany;

    private Boolean isAvailable;

    public User() {
    }



    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_user", nullable = false, insertable = true, updatable = false)
    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    @Column(name = "name", nullable = true, insertable = true, updatable = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "surname", nullable = false, insertable = true, updatable = true)
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Column(name = "patronymic", nullable = true, insertable = true, updatable = true)
    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    @Column(name = "email", nullable = true, insertable = true, updatable = true)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "city", nullable = true, insertable = true, updatable = true)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "street", nullable = true, insertable = true, updatable = true)
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Column(name = "house", nullable = true, insertable = true, updatable = true)
    public String getHouse() {
        return house;
    }

    public void setHouse(String house) {
        this.house = house;
    }

    @Column(name = "flat", nullable = true, insertable = true, updatable = true)
    public String getFlat() {
        return flat;
    }

    public void setFlat(String flat) {
        this.flat = flat;
    }

    @ManyToOne
    @JoinColumn(name = "user_role", nullable = false)
    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }

    @Column(name = "login", nullable = false, insertable = true, updatable = true)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Column(name = "password", nullable = false, insertable = true, updatable = true)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "salt", nullable = false, insertable = true, updatable = false)
    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    @ManyToOne
    @JoinColumn(name = "trucking_company", nullable = true)
    public TruckingCompany getTruckingCompany() {
        return truckingCompany;
    }

    public void setTruckingCompany(TruckingCompany truckingCompany) {
        this.truckingCompany = truckingCompany;
    }

    @Column(name = "is_available", nullable = true)
    public Boolean getAvailable() {
        return isAvailable;
    }

    public void setAvailable(Boolean available) {
        isAvailable = available;
    }
}
