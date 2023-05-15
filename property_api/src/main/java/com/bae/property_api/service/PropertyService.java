package com.bae.property_api.service;

import com.bae.property_api.entities.Property;
import com.bae.property_api.repo.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepo repo;

    public PropertyService(PropertyRepo repo){
        this.repo = repo;
    }
    public PropertyService(){

    }

    public List<Property> getAll() {
        return this.repo.findAll();
    }


    public Property getProperty(Long id) {

        return this.repo.findById(id).get();

    }


    public Property createProperty (Property prop){

        return this.repo.save(prop);

    }

    public Property deleteProperty (long id){
        Property removed = this.getProperty(id);
        this.repo.deleteById(id);
        return removed;

    }

    public Property updateProperty (long id, Property property)    {

        Property toUpdate = this.getProperty(id);
        if (property.getAddress()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getPostcode()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getPrice()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getStatus()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getType()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getBathrooms()!=0) toUpdate.setAddress(property.getAddress());
        if (property.getBedrooms()!=0) toUpdate.setAddress(property.getAddress());
        //if (property.getSeller_id_fk()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getSeller()!=null) toUpdate.setAddress(property.getAddress());

        return this.repo.save(toUpdate);

    }


}
