package com.rudii.Stock.controller;

import com.rudii.Stock.model.Users;
import com.rudii.Stock.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController /** Handles Request from Client, RESTful web service, creates JSON/XML response body */
@RequestMapping(path = "api")
@RequiredArgsConstructor
public class UserSignInController {

    private final UserService userService;

    /*
    @Autowired
    public UserSignInController(UserService userService) {
        this.userService = userService;
    }
    */

    @PostMapping()
    public ResponseEntity<UserDetails> authenticate(@RequestBody Users user) {
        return ResponseEntity.ok().body(userService.loadUserByUsername(user.getEmail()));
    }
    /*
    public String authenticateUser(@RequestBody Users user) {
        return userService.authenticateUser(user);
    }
    */
}
