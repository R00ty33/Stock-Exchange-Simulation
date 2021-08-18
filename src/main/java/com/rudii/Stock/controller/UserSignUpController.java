package com.rudii.Stock.controller;

import com.rudii.Stock.model.Users;
import com.rudii.Stock.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController /** Handles Request from Client, RESTful web service, creates JSON/XML response body */
@RequestMapping(path = "api")
@RequiredArgsConstructor
public class UserSignUpController {

    private final UserService userService;

    /*
    @Autowired
    public UserSignUpController(UserService userService) {
        this.userService = userService;
    }
    */

    @GetMapping("/signup")
    public List<Users> getUsers() {
        return userService.getUsers();
    }

    public Users getUser(int id) {
        return userService.getUser(id);
    }

    @PostMapping("/signup")
    public void registerNewUser(@RequestBody Users user) {
        userService.addNewUser(user);
    }


}
