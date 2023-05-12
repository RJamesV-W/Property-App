package com.bae.property_api.service;

import com.bae.property_api.entities.Seller;
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

    public List<Seller> getAll() {
        return this.repo.findAll();
    }


    public Seller getSeller(Long id) {

        return this.repo.findById(id).get();

    }


    public Seller createSeller (Seller seller){

        return this.repo.save(seller);

    }

    public Seller deleteSeller (long id){
        Seller removed = this.getSeller(id);
        this.repo.deleteById(id);
        return removed;

    }
    public Seller updateSeller (long id, Seller seller)    {

        Seller toUpdate = this.getSeller(id);
        if (seller.getFirstName()!=null) toUpdate.setFirstName(seller.getFirstName());
        if (seller.getSurname()!=null) toUpdate.setSurname(seller.getSurname());
        if (seller.getEmail()!=null) toUpdate.setEmail(seller.getEmail());
        if (seller.getAddress()!=null) toUpdate.setAddress(seller.getAddress());
        if (seller.getPhone()!=null) toUpdate.setPhone(seller.getPhone());
        if (seller.getPostcode()!=null) toUpdate.setPostcode(seller.getPostcode());

        return this.repo.save(toUpdate);

    }


}
