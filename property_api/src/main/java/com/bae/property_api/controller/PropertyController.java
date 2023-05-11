package com.bae.property_api.controller;

import com.bae.property_api.entities.Properties;
import com.bae.property_api.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    PropertyService service;

    /**
     * Constructor for PropertyController
     *
     * @param service The PropertyService instance
     */
    public PropertyController(PropertyService service) {
        this.service = service;
    }

    /**
     * Get all Properties
     *
     * @return List of Properties
     */
    @GetMapping("/read")
    public List<Properties> read() {
        return service.getAll();
    }

    /**
     * Get a Property by ID
     *
     * @param id The ID of the Property
     * @return Property
     */
    @GetMapping("/read/{id}")
    public Properties readOne(@PathVariable long id) {
        return service.getProperty(id);
    }

    /**
     * Create a new Property
     *
     * @param newProperty The Property object to create
     * @return The created Property
     */
    @PostMapping("/add")
    public Properties add(@RequestBody Properties newProperty) {
        return this.service.createProperty(newProperty);
    }

    /**
     * Delete a Property by ID
     *
     * @param id The ID of the Property to delete
     */
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        service.deleteProperty(id);
    }

    /**
     * Update a Property by ID
     *
     * @param id         The ID of the Property to update
     * @param properties The Property object with updated information
     * @return The updated Property
     */
    @PutMapping("/update/{id}")
    public Properties updateProperty(@PathVariable long id, @RequestBody Properties properties) {
        return this.service.updateProperty(id, properties);
    }
}
