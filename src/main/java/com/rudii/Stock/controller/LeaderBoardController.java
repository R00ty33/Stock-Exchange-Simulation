package com.rudii.Stock.controller;

import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import com.rudii.Stock.service.StockService;
import com.rudii.Stock.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path ="/api/v1/LeaderBoard")
public class LeaderBoardController {
    private UserService userService;

    @Autowired
    public LeaderBoardController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/GetLeaderBoard")
    public List<UsersPositions> getLeaderBoard() {
       return userService.getLeaderBoard();
    }
}
