package com.rudii.Stock.model;

import java.io.Serializable;

public class Positions implements Serializable {

    private String symbol;
    private int shares;
    private int price_per_share;

    public Positions() {

    }

    public Positions(String symbol, int shares, int price_per_share) {
        this.symbol = symbol;
        this.shares = shares;
        this.price_per_share = price_per_share;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public int getShares() {
        return shares;
    }

    public void setShares(int shares) {
        this.shares = shares;
    }

    public int getPrice_per_share() {
        return price_per_share;
    }

    public void setPrice_per_share(int price_per_share) {
        this.price_per_share = price_per_share;
    }
}
