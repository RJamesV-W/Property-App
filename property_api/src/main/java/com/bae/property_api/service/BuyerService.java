package com.bae.property_api.service;

import com.bae.property_api.entities.Buyers;
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

    public List<Buyers> getAll() {
        return this.repo.findAll();
    }


    public Buyers getBuyer(Long id) {

        return this.repo.findById(id).get();

    }


    public Buyers createBuyer (Buyers buyer){

        return this.repo.save(buyer);

    }

    public Buyers deleteBuyer (long id){
        Buyers removed = this.getBuyer(id);
        this.repo.deleteById(id);
        return removed;

    }

    public Buyers updateBuyer (long id,  Buyers buyers)    {

        Buyers toUpdate = this.getBuyer(id);
        if (buyers.getFirstName()!=null) toUpdate.setFirstName(buyers.getFirstName());
        if (buyers.getLastName()!=null) toUpdate.setLastName(buyers.getLastName());
        if (buyers.getEmail()!=null) toUpdate.setEmail(buyers.getEmail());
        if (buyers.getAddress()!=null) toUpdate.setAddress(buyers.getAddress());
        if (buyers.getPhone()!=null) toUpdate.setPhone(buyers.getPhone());
        if (buyers.getPostcode()!=null) toUpdate.setPostcode(buyers.getPostcode());

        return this.repo.save(toUpdate);

    }


}
