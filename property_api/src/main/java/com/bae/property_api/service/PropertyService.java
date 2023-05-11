package com.bae.property_api.service;

import com.bae.property_api.entities.Properties;
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

    public List<Properties> getAll() {
        return this.repo.findAll();
    }


    public Properties getProperty(Long id) {

        return this.repo.findById(id).get();

    }


    public Properties createProperty (Properties prop){

        return this.repo.save(prop);

    }

    public Properties deleteProperty (long id){
        Properties removed = this.getProperty(id);
        this.repo.deleteById(id);
        return removed;

    }

    public Properties updateProperty (long id, Properties property)    {

        Properties toUpdate = this.getProperty(id);
        if (property.getAddress()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getPostcode()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getPrice()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getStatus()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getType()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getBathrooms()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getBedrooms()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getGarden()!=null) toUpdate.setAddress(property.getAddress());
        //if (property.getSeller_id_fk()!=null) toUpdate.setAddress(property.getAddress());
        if (property.getSellers()!=null) toUpdate.setAddress(property.getAddress());

        return this.repo.save(toUpdate);

    }


}
