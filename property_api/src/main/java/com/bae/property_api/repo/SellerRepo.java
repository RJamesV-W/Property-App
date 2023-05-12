package com.bae.property_api.repo;

import com.bae.property_api.entities.Seller;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepo extends CrudRepository<Seller, Long> {
    List<Seller> findAll();
}
