package com.rudii.Stock.config;

import com.rudii.Stock.Repository.UserRepository;
import com.rudii.Stock.Repository.UsersPositionsRepository;
import com.rudii.Stock.model.Positions;
import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;


@Configuration
public class UserConfig {
    @Bean
    /* executes method & registers the return value as Bean in the container */
          /* Creates Users in DB */
    CommandLineRunner commandLineRunner(UserRepository usersRepository, UsersPositionsRepository positionsRepository) {
        return args -> {
            Users nick = new Users(
                    1,
                    "Nick",
                    "Rudolph",
                    "n.rudolph2011@gmail.com",
                    "password"
            );

            Users alex = new Users(
                    "Alex",
                    "Johns",
                    "alex@gmail.com",
                    "test"
            );
            usersRepository.saveAll( /* JpaRepository Method */
                    List.of(nick, alex)
            );

            UsersPositions test = new UsersPositions(
                    1,
                    new Positions(
                            "GME",
                            1000,
                            160
                    )
            );
            positionsRepository.saveAll( /** JpaRepository Method */
                    List.of(test)
            );
        };
    }
}

