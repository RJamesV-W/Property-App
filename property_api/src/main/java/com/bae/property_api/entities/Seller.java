package com.bae.property_api.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;


@Entity
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long seller_id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String postcode;

    @Column(nullable = false)
    private String phone;

    // One seller can have many properties
    @OneToMany//(mappedBy = "seller", fetch = FetchType.EAGER)
    @JsonIgnore
    //@JsonBackReference ("prop-ref")
    //@JsonIgnoreProperties({"seller"})
    private List<Property> propertyCount;

    public long getSeller_id() {
        return seller_id;
    }

    public Seller(long id, String firstName, String surname, String email, String address, String postcode, String phone, List<Property> propertyCount) {
        this.seller_id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
        this.propertyCount = propertyCount;
    }

    public Seller(long id, String firstName, String surname, String email, String address, String postcode, String phone) {
        this.seller_id = id;
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getPhone() {  return phone; }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public List<Property> getPropertiesList() {
        return propertyCount;
    }

    public void setPropertiesList(List<Property> propertyCount) {
        this.propertyCount = propertyCount;
    }

    public Seller() {
    }
    public Seller(long id) {
        this.seller_id = id;
    }

    public void setSeller_id(long id) {
        this.seller_id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    @Override
    public String toString() {
        return "Seller{" +
                "seller_id=" + seller_id +
                ", firstName='" + firstName + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", postcode='" + postcode + '\'' +
                ", phone=" + phone +
                ", propertiesList=" + propertyCount +
                '}';
    }
}
