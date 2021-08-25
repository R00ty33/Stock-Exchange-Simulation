package com.rudii.Stock.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.rudii.Stock.model.Stocks;
import com.rudii.Stock.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yahoofinance.Stock;
import yahoofinance.histquotes.HistoricalQuote;
import yahoofinance.quotes.stock.StockQuote;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/stocks")
public class StockController {

    private StockService stockService;

    @Autowired
    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/GME/Price")
    public StockQuote getPrice(StockService stockService) throws IOException {
        Stocks stock = stockService.findStock("GME");
        return stockService.findQuotes(stock);
    }

    @GetMapping("/GME/History")
    public List<HistoricalQuote> getHistory(StockService stockService) throws IOException {
        Stocks stock = stockService.findStock("GME");
        return stockService.findHistory(stock);
    }

    @PostMapping("/GetStock")
    public Object[] getStockData(@RequestParam String symbol) throws IOException {
        Stocks stock = stockService.findStock(symbol);
        System.out.println(symbol);
        System.out.println(stock);
        StockQuote stockQuote = stockService.findQuotes(stock);
        List<HistoricalQuote> history = stockService.findHistory(stock);
        return new Object[]{stockQuote, history};
    }


    /*
    public String getSymbol(StockService stockService) throws IOException {
        Stocks stock = stockService.findStock("GME");
        return stockService.findString(stock);
    }
    */
}
