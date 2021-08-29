package com.rudii.Stock.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.rudii.Stock.Repository.StocksRepository;
import com.rudii.Stock.model.Positions;
import com.rudii.Stock.model.Stocks;
import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.quotes.stock.StockQuote;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class StockService {
    private final StocksRepository stocksRepository;

    @Autowired
    public StockService(StocksRepository stocksRepository) {
        this.stocksRepository = stocksRepository;
    }

    public Stocks findStock(String ticker) {
        try {
            return new Stocks(YahooFinance.get(ticker));

        }
        catch (IOException e) {
            System.out.println("Error" + e + " " + e.getMessage());
        }
        return null;
    }

    public BigDecimal findPrice(Stocks stock) throws IOException {
        return stock.getStock().getQuote(true).getPrice();
    }

    public StockQuote findQuotes(Stocks stock) throws IOException {
        return stock.getStock().getQuote(true);
    }

    public List<HistoricalQuote> findHistory(Stocks stock) throws IOException {
        return stock.getStock().getHistory();
    }

    public String findSymbol(Stocks stock) throws IOException {
        return stock.getStock().getSymbol();
    }

    public Stock findAll(Stocks stock) throws IOException {
        return stock.getStock();
    }

    public ResponseEntity<Exception> addNewPosition(String accessToken, String symbol, int shares, String transaction)  {
        String email = JWT.decode(accessToken).getSubject();
        try {
            /* verify token */
            Algorithm algorithm = Algorithm.HMAC256("secret");
            Verification verifier = JWT.require(algorithm);
            System.out.println(verifier.build().verify(accessToken));

            /* if user isnt in database, add users new positions */
            UsersPositions usersPositions = stocksRepository.findUserByEmail(email);
            if (usersPositions == null) {
                System.out.println("Adding users positions to users_positions table");
                Integer stockPrice = findPrice(findStock(symbol)).intValue();
                /* deduct money */
                if (shares * stockPrice <= 5000) {
                    Integer newBalance = 5000 - (shares * stockPrice);
                    List<Positions> list = new ArrayList<>();
                    Positions positions = new Positions(symbol, shares, stockPrice);
                    list.add(positions);
                    list.add(new Positions("GME", 1000, 160));
                    UsersPositions newUsersPositions = new UsersPositions(email, newBalance, list);
                    stocksRepository.save(newUsersPositions);
                }
                else {
                    return new ResponseEntity<Exception> (HttpStatus.NOT_ACCEPTABLE);
                }
            }
            else if (usersPositions != null) {
                /* if position exists, update position */
                /* check balance */
                Integer stockPrice = findPrice(findStock(symbol)).intValue();
                Integer newBalance = usersPositions.getBalance() - (shares * stockPrice);
                if (newBalance >= 0) {
                    //Positions positions = usersPositions.getPositions();
                    //Integer totalShares = positions.getShares() + shares;
                    //String symbols = positions.getSymbol();
                    //Integer price_per_share = ((positions.getPrice_per_share() * positions.getShares()) + (shares * stockPrice)) / totalShares;
                    //Positions newPosition = new Positions(symbols, totalShares, price_per_share);
                    //UsersPositions newUsersPositions = new UsersPositions(email, newBalance, newPosition);
                    //stocksRepository.save(newUsersPositions);
                }
                else {
                    return new ResponseEntity<Exception> (HttpStatus.NOT_ACCEPTABLE);
                }
                /* if position does not exists, add position */
            }
            /* if user doesnt have current stock, add stock to positions */
                /* deduct money */
            stocksRepository.findUserByEmail(email);
        }
        catch(Exception e) {
            System.out.println("error in addNewPosition" + e);
            return new ResponseEntity<Exception> (HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<Exception> (HttpStatus.OK);
    }

}
