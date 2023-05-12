package com.bae.property_api.service;

import com.bae.property_api.entities.Buyer;
import com.bae.property_api.repo.BuyerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepo repo;

    public BuyerService(BuyerRepo repo){
        this.repo = repo;
    }
    public BuyerService(){

    }

    public List<Buyer> getAll() {
        return this.repo.findAll();
    }


    public Buyer getBuyer(Long id) {

        return this.repo.findById(id).get();

    }


    public Buyer createBuyer (Buyer buyer){

        return this.repo.save(buyer);

    }

    public Buyer deleteBuyer (long id){
        Buyer removed = this.getBuyer(id);
        this.repo.deleteById(id);
        return removed;

    }

    public Buyer updateBuyer (long id, Buyer buyer)    {

        Buyer toUpdate = this.getBuyer(id);
        if (buyer.getFirstName()!=null) toUpdate.setFirstName(buyer.getFirstName());
        if (buyer.getLastName()!=null) toUpdate.setLastName(buyer.getLastName());
        if (buyer.getEmail()!=null) toUpdate.setEmail(buyer.getEmail());
        if (buyer.getAddress()!=null) toUpdate.setAddress(buyer.getAddress());
        if (buyer.getPhone()!=null) toUpdate.setPhone(buyer.getPhone());
        if (buyer.getPostcode()!=null) toUpdate.setPostcode(buyer.getPostcode());

        return this.repo.save(toUpdate);

    }


}
