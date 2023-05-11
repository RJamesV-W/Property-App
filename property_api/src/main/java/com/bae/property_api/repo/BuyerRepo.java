package com.bae.property_api.repo;

import com.bae.property_api.entities.Buyers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BuyerRepo extends CrudRepository<Buyers,Long> {
    List<Buyers> findAll();
}