package com.bae.property_api.service;

import com.bae.property_api.entities.Sellers;
import com.bae.property_api.repo.SellerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SellerService {
    @Autowired
    private SellerRepo repo;

    public SellerService(SellerRepo repo){
        this.repo = repo;
    }
    public SellerService(){

    }

    public List<Sellers> getAll() {
        return this.repo.findAll();
    }


    public Sellers getSeller(Long id) {

        return this.repo.findById(id).get();

    }


    public Sellers createSeller (Sellers seller){

        return this.repo.save(seller);

    }

    public Sellers deleteSeller (long id){
        Sellers removed = this.getSeller(id);
        this.repo.deleteById(id);
        return removed;

    }
    public Sellers updateSeller (long id,  Sellers sellers)    {

        Sellers toUpdate = this.getSeller(id);
        if (sellers.getFirstName()!=null) toUpdate.setFirstName(sellers.getFirstName());
        if (sellers.getLastName()!=null) toUpdate.setLastName(sellers.getLastName());
        if (sellers.getEmail()!=null) toUpdate.setEmail(sellers.getEmail());
        if (sellers.getAddress()!=null) toUpdate.setAddress(sellers.getAddress());
        if (sellers.getPhone()!=0) toUpdate.setPhone(sellers.getPhone());
        if (sellers.getPostcode()!=null) toUpdate.setPostcode(sellers.getPostcode());

        return this.repo.save(toUpdate);

    }


}
