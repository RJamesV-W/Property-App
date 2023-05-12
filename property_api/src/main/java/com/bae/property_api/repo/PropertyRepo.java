package com.bae.property_api.repo;


import com.bae.property_api.entities.Property;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PropertyRepo extends CrudRepository<Property,Long> {
    List<Property> findAll();
}
