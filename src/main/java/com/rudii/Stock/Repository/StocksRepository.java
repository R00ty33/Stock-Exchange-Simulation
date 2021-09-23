package com.rudii.Stock.Repository;

import com.rudii.Stock.model.Positions;
import com.rudii.Stock.model.Users;
import com.rudii.Stock.model.UsersPositions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface StocksRepository extends JpaRepository<UsersPositions, Integer> {
    /** findUserByEmail method() */
    //@Query("SELECT UsersPositions.test, Users.email FROM UsersPositions, Users INNER JOIN Users ON Users.id = UsersPositions.account_id WHERE Users.email = ?1")
    @Query("SELECT s FROM UsersPositions s WHERE s.user_email = ?1")
    UsersPositions findUserByEmail(String email);

    //@Query(value = "SELECT positions from users_positions WHERE user_email = ?1", nativeQuery = true)
    //UsersPositions getPositionsByEmail(String email);
    @Transactional
    @Modifying
    @Query("UPDATE UsersPositions SET positions = ?1 WHERE user_email = ?2")
    void updatePositionsByEmail(String updatedPositions, String email);

    @Transactional
    @Modifying
    @Query("UPDATE UsersPositions SET balance = ?1 WHERE user_email = ?2")
    void updateBalanceByEmail(Integer newBalance, String email);
}
