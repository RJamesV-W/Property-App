package com.bae.property_api.controller;

import com.bae.property_api.entities.Buyer;
import com.bae.property_api.service.BuyerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/buyer")
public class BuyerController {

    @Autowired
    BuyerService service;

    /**
     * Get all Buyers
     *
     * @return List of Buyers
     */
    @GetMapping("/read")
    public List<Buyer> read() {
        return service.getAll();
    }

    /**
     * Get a Buyer by ID
     *
     * @param id The ID of the Buyer
     * @return Buyer
     */
    @GetMapping("/read/{id}")
    public Buyer readOne(@PathVariable long id) {
        return service.getBuyer(id);
    }

    /**
     * Create a new Buyer
     *
     * @param newBuyer The Buyer object to create
     * @return The created Buyer
     */
    @PostMapping("/add")
    public Buyer add(@Valid @RequestBody Buyer newBuyer) {
        return service.createBuyer(newBuyer);
    }

    /**
     * Delete a Buyer by ID
     *
     * @param id The ID of the Buyer to delete
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        service.deleteBuyer(id);
    }

    /**
     * Update a Buyer by ID
     *
     * @param id     The ID of the Buyer to update
     * @param buyer  The Buyer object with updated information
     * @return The updated Buyer
     */
    @PutMapping("/update/{id}")
    public Buyer updatePerson(@PathVariable long id, @RequestBody Buyer buyer) {
        return this.service.updateBuyer(id, buyer);
    }
}
