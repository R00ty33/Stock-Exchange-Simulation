package com.rudii.Stock.service;

import com.rudii.Stock.Repository.StocksRepository;
import com.rudii.Stock.model.UsersPositions;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class UsersPositionsService {
    private final StocksRepository stocksRepository;

    @Autowired
    public UsersPositionsService(StocksRepository stocksRepository) {
        this.stocksRepository = stocksRepository;
    }

    public List<UsersPositions> getPositions() {
        return stocksRepository.findAll(); /** JpaRepository Method findAll() */
    }

    public void addNewPosition(String email) {
        //usersPositionsRepository.save(usersPositions);
        stocksRepository.findUserByEmail(email);
    }
}
