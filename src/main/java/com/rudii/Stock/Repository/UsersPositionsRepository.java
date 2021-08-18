package com.rudii.Stock.Repository;

import com.rudii.Stock.model.UsersPositions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersPositionsRepository extends JpaRepository<UsersPositions, String> {

}
