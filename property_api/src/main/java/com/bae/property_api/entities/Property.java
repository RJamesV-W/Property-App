package com.bae.property_api.entities;

import jakarta.persistence.*;

@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long property_id;

    private String address;
    private String postcode;
    private String price;
    private String status;
    private String type;
    private int bedrooms;
    private int bathrooms;
    private boolean garden;

    @JoinColumn(name = "seller_id_fk")
    @ManyToOne
    private Seller seller;

    // Default constructor
    public Property() {
    }

    /**
     * Constructor with all fields
     *
     * @param property_id The ID of the property
     * @param address     Address of the property
     * @param postcode    Postcode of the property
     * @param price       Price of the property
     * @param status      Status of the property
     * @param type        Type of the property
     * @param bedrooms    Number of bedrooms
     * @param bathrooms   Number of bathrooms
     * @param garden      Garden availability
     * @param seller      Seller object
     */
    public Property(long property_id, String address, String postcode, String price, String status, String type, int bedrooms, int bathrooms, boolean garden, Seller seller) {
        this.property_id = property_id;
        this.address = address;
        this.postcode = postcode;
        this.price = price;
        this.status = status;
        this.type = type;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.garden = garden;
        this.seller = seller;
    }

    public long getProperty_id() {
        return property_id;
    }

    public void setProperty_id(long property_id) {
        this.property_id = property_id;
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

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public boolean getGarden() {
        return garden;
    }

    public void setGarden(boolean garden) {
        this.garden = garden;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "Properties{" +
                "property_id=" + property_id +
                ", address='" + address + '\'' +
                ", postcode='" + postcode + '\'' +
                ", price='" + price + '\'' +
                ", status='" + status + '\'' +
                ", type='" + type + '\'' +
                ", bedrooms='" + bedrooms + '\'' +
                ", bathrooms='" + bathrooms + '\'' +
                ", garden='" + garden + '\'' +
                ", seller=" + seller +
                '}';
    }
}
