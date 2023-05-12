package com.bae.property_api.repo;

import com.bae.property_api.entities.Buyer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BuyerRepo extends CrudRepository<Buyer,Long> {
    List<Buyer> findAll();
}