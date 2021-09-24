package com.rudii.Stock.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.impl.JWTParser;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;
import com.rudii.Stock.Repository.StocksRepository;
import com.rudii.Stock.Repository.UserRepository;
import com.rudii.Stock.model.Stocks;
import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Service @Transactional @Slf4j @RequiredArgsConstructor
/** Service Component, contains and implements methods  */
public class UserService implements UserDetailsService {

   private final UserRepository userRepository;
   private final StocksRepository stocksRepository;
   private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.info(email);
        Users user = userRepository.findByEmail(email);
        if (user == null) {
            log.error("User not found in the DB");
            throw new UsernameNotFoundException("User not found in the DB");
        } else {
            log.info("User found in the database: {}", email);
        }
        Collection<SimpleGrantedAuthority> authorties = new ArrayList<>();
        authorties.add(new SimpleGrantedAuthority(user.getFirstName()));
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorties);
    }

   /*
   @Autowired
   public UserService(UserRepository userRepository) {
       this.userRepository = userRepository;
    }
    */

    public Users getUserDetailsByAccessToken(String accessToken) {
        Algorithm algorithm = Algorithm.HMAC256("secret");
        DecodedJWT jwt = JWT.decode(accessToken);
        String email = jwt.getSubject();
        Verification verifier = JWT.require(algorithm);
        System.out.println(verifier.build().verify(accessToken));
        return userRepository.findUserByEmail(email);
    }

    public UsersPositions getUserPositionsByAccessToken(String accessToken) {
        Algorithm algorithm = Algorithm.HMAC256("secret");
        DecodedJWT jwt = JWT.decode(accessToken);
        String email = jwt.getSubject();
        Verification verifier = JWT.require(algorithm);
        System.out.println(verifier.build().verify(accessToken));
        return stocksRepository.findUserByEmail(email);
    }

    public List<Users> getUsers() {
       return userRepository.findAll(); /** JpaRepository Method findAll() */
    }

    public Users getUser(int id) {
       return userRepository.getById(id);
    }

    public void addNewUser(Users user) {
       Users userOptional = userRepository.findUserByEmail(user.getEmail()); /** Method from UserRepository */
       user.setPassword(passwordEncoder.encode(user.getPassword()));
       if (userOptional != null) {
           throw new IllegalStateException("email taken");
       }
       userRepository.save(user);
    }

    public String authenticateUser(Users user) {
        Users userOptional = userRepository.findUserByEmail(user.getEmail()); /** Method from UserRepository */
        if (userOptional != null) {
            String savedPassword = userRepository.findUsersPassword(user.getEmail());
            String inputtedPassword = user.getPassword();
            if (savedPassword.matches(inputtedPassword)) {
                return "Authentication Success";
            }
            else {
                return "Incorrect Password";
            }
        }


        return "Error: Not Found";
    }
}
