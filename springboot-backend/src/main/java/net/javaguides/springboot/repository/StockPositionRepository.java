package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.StockPosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockPositionRepository extends JpaRepository<StockPosition, Long>{

}
