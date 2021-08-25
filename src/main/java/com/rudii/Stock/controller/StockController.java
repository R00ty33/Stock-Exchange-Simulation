package com.rudii.Stock.controller;

import com.rudii.Stock.model.Stocks;
import com.rudii.Stock.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


    /*
    public String getSymbol(StockService stockService) throws IOException {
        Stocks stock = stockService.findStock("GME");
        return stockService.findString(stock);
    }
    */
}
