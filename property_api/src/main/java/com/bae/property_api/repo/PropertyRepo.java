package com.bae.property_api.repo;


import com.bae.property_api.entities.Properties;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PropertyRepo extends CrudRepository<Properties,Long> {
    List<Properties> findAll();
}
