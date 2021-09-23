package com.rudii.Stock.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;
import com.fasterxml.jackson.databind.util.JSONPObject;
import com.rudii.Stock.Repository.StocksRepository;
import com.rudii.Stock.Repository.UserRepository;
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
                int stockPrice = findPrice(findStock(symbol)).intValue();
                /* deduct money */
                if (shares * stockPrice <= 5000) {
                    Integer newBalance = 5000 - (shares * stockPrice);
                    List<Positions> list = new ArrayList<>();
                    Positions positions = new Positions(symbol, shares, stockPrice);
                    list.add(positions);
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
                int stockPrice = findPrice(findStock(symbol)).intValue();
                int newBalance = usersPositions.getBalance() - (shares * stockPrice);
                if (newBalance >= 0) {
                    System.out.println("User exists");
                    List<Positions> list = usersPositions.getPositions();
                    boolean symbolExists = false;
                    for (int i=0; i<list.size(); i++) {
                        System.out.println("Symbol = " + list.get(i).getSymbol());
                        System.out.println("Current Shares = " + list.get(i).getShares());
                        System.out.println("Current price per share = " + list.get(i).getPrice_per_share());
                        if (list.get(i).getSymbol().matches(symbol)) { // Position exists
                            System.out.println("Found: Position Exists...");
                            System.out.println("Updating totalShares and price_per_share");
                            int totalShares = list.get(i).getShares() + shares;
                            int price_per_share = ((list.get(i).getPrice_per_share() * list.get(i).getShares()) + (shares * stockPrice)) / totalShares;
                            System.out.println("Total Shares: " + totalShares);
                            System.out.println("Price per Share = " + price_per_share);
                            Positions updatedPosition = new Positions(symbol, totalShares, price_per_share);
                            list.set(i, updatedPosition);
                            symbolExists = true;
                        }
                    }
                    if (symbolExists) {
                        System.out.println("Found: Position Exists...");
                        System.out.println("Updating database...");
                        ObjectMapper objectMapper = new ObjectMapper();
                        String json = objectMapper.writeValueAsString(list);
                        System.out.println(json);
                        stocksRepository.updatePositionsByEmail(json, email);
                        stocksRepository.updateBalanceByEmail(newBalance, email);
                        String result = objectMapper.writeValueAsString(stocksRepository.findUserByEmail(email));
                        System.out.println(result);
                    } else {
                        System.out.println("Position Does Not Exist...");
                        Positions newPosition = new Positions(symbol, shares, stockPrice);
                        list.add(newPosition);
                        System.out.println("Updating database...");
                        ObjectMapper objectMapper = new ObjectMapper();
                        String json = objectMapper.writeValueAsString(list);
                        System.out.println(json);
                        stocksRepository.updatePositionsByEmail(json, email);
                        stocksRepository.updateBalanceByEmail(newBalance, email);
                        String result = objectMapper.writeValueAsString(stocksRepository.findUserByEmail(email));
                        System.out.println(result);
                    }
                }
                else {
                    return new ResponseEntity<Exception> (HttpStatus.NOT_ACCEPTABLE);
                }
                /* if position does not exists, add position */
            }
            /* if user doesnt have current stock, add stock to positions */
                /* deduct money */

            //System.out.println(stocksRepository.findUserByEmail(email).toString());
            //System.out.println(stocksRepository.findUserByEmail(email).getPositions().toString());
        }
        catch(Exception e) {
            System.out.println("error in addNewPosition" + e);
            return new ResponseEntity<Exception> (HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<Exception> (HttpStatus.OK);
    }

}
