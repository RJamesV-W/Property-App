package com.bae.property_api.repo;

import com.bae.property_api.entities.Sellers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SellerRepo extends CrudRepository<Sellers, Long> {
    List<Sellers> findAll();
}
