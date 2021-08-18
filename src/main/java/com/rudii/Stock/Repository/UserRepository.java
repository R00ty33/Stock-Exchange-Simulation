package com.rudii.Stock.Repository;

import com.rudii.Stock.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/** Extending from the JpaRepository implements methods for our data repository */
/** Encapsulates storage, retrieval, and search behavior */
@Repository /** responsible for data access */
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);

    /** findUserByEmail method() */
    @Query("SELECT s FROM Users s WHERE s.email = ?1")
    Users findUserByEmail(String email);

    @Query("SELECT s.password FROM Users s WHERE s.email = ?1")
    String findUsersPassword(String email);
}
