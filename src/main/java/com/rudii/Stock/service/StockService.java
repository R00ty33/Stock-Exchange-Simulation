package com.rudii.Stock.service;

import com.rudii.Stock.model.Stocks;
import org.springframework.stereotype.Service;
import yahoofinance.Stock;
import yahoofinance.YahooFinance;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.quotes.stock.StockQuote;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@Service
public class StockService {

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


}
