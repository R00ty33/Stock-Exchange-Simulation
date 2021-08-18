package com.rudii.Stock.model;

public class Positions {

    private String symbol;
    private int shares;
    private long price_per_share;

    public Positions() {

    }

    public Positions(String symbol, int shares, long price_per_share) {
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

    public long getPrice_per_share() {
        return price_per_share;
    }

    public void setPrice_per_share(long price_per_share) {
        this.price_per_share = price_per_share;
    }
}
