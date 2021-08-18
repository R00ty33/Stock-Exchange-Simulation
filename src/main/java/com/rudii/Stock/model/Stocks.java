package com.rudii.Stock.model;


import org.hibernate.annotations.Type;
import yahoofinance.Stock;

import javax.persistence.*;
import java.time.LocalDateTime;


public class Stocks {


    /* Attributes */
    private Stock stock;
    private LocalDateTime lastUpdated;

    /* NO-ARG Constructor */
    public Stocks() {

    }

    /* Constructor */
    public Stocks(Stock stock) {
        this.stock = stock;
        lastUpdated = LocalDateTime.now();
    }


    /* GETTERS & SETTERS */
    public Stock getStock() {
        return stock;
    }


    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    /* TO STRING */
    @Override
    public String toString() {
        return "Stocks{" +
                ", stock=" + stock +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}