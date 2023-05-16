package com.bae.property_api.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

@Entity
public class Buyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long buyer_id;

    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String Surname;

    @NotNull
    @Email
    @Length(min = 5)
    private String email;
    @Column(nullable = false)
    private String address;

    @NotEmpty
    private String postcode;
    @Column(nullable = false)
    private String phone;

    /**
     * Constructor with all fields
     *
     * @param buyer_id   The ID of the buyer
     * @param firstName  First name of the buyer
     * @param Surname   Last name of the buyer
     * @param email      Email of the buyer
     * @param address    Address of the buyer
     * @param postcode   Postcode of the buyer's address
     * @param phone      Phone number of the buyer
     */
    public Buyer(long buyer_id, String firstName, String Surname, String email, String address, String postcode, String phone) {
        this.buyer_id = buyer_id;
        this.firstName = firstName;
        this.Surname = Surname;
        this.email = email;
        this.address = address;
        this.postcode = postcode;
        this.phone = phone;
    }

    public long getBuyer_id() {
        return buyer_id;
    }

    public void setBuyer_id(long id) {
        this.buyer_id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return Surname;
    }

    public void setSurname(String Surname) {
        this.Surname = Surname;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Default constructor
    public Buyer() {
    }

    @Override
    public String toString() {
        return "Buyer{" +
                "id=" + buyer_id +
                ", firstName='" + firstName + '\'' +
                ", Surname='" + Surname + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", postcode=" + postcode +
                ", phone=" + phone +
                '}';
    }
}
