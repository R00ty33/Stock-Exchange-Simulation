package com.rudii.Stock.controller;

import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import com.rudii.Stock.service.StockService;
import com.rudii.Stock.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/user")
public class UserDetailsController {

    private UserService userService;
    @Autowired
    public UserDetailsController(UserService userService) { this.userService = userService; }

    @PostMapping("/UserDetails")
    public Users getUserDetails(@RequestParam String accessToken) {
        return userService.getUserDetailsByAccessToken(accessToken);
    }

    @PostMapping("/PositionDetails")
    public UsersPositions getUserPositionsDetails(@RequestParam String accessToken) {
        return userService.getUserPositionsByAccessToken(accessToken);
    }
}
