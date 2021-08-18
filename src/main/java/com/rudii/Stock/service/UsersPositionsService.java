package com.rudii.Stock.service;

import com.rudii.Stock.Repository.UsersPositionsRepository;
import com.rudii.Stock.model.UsersPositions;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UsersPositionsService {
    private final UsersPositionsRepository usersPositionsRepository;

    @Autowired
    public UsersPositionsService(UsersPositionsRepository usersPositionsRepository) {
        this.usersPositionsRepository = usersPositionsRepository;
    }

    public List<UsersPositions> getPositions() {
        return usersPositionsRepository.findAll(); /** JpaRepository Method findAll() */
    }

    public void addNewPosition(UsersPositions usersPositions) {
        usersPositionsRepository.save(usersPositions);
    }
}
