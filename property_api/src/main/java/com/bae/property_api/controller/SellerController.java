package com.bae.property_api.controller;

import com.bae.property_api.entities.Sellers;
import com.bae.property_api.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/seller")
public class SellerController {

    @Autowired
    SellerService service;

    /**
     * Get all Sellers
     *
     * @return List of Sellers
     */
    @GetMapping("/read")
    public List<Sellers> read() {
        return service.getAll();
    }

    /**
     * Get a Seller by ID
     *
     * @param id The ID of the Seller
     * @return Seller
     */
    @GetMapping("/read/{id}")
    public Sellers readOne(@PathVariable long id) {
        return service.getSeller(id);
    }

    /**
     * Create a new Seller
     *
     * @param newSeller The Seller object to create
     * @return The created Seller
     */
    @PostMapping("/add")
    public Sellers add(@RequestBody Sellers newSeller) {
        return service.createSeller(newSeller);
    }

    /**
     * Delete a Seller by ID
     *
     * @param id The ID of the Seller to delete
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        service.deleteSeller(id);
    }

    /**
     * Update a Seller by ID
     *
     * @param id      The ID of the Seller to update
     * @param sellers The Seller object with updated information
     * @return The updated Seller
     */
    @PutMapping("/update/{id}")
    public Sellers updatePerson(@PathVariable long id, @RequestBody Sellers sellers) {
        return this.service.updateSeller(id, sellers);
    }
}
