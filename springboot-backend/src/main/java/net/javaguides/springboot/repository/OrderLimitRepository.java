package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.StockOrderLimit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderLimitRepository extends JpaRepository<StockOrderLimit, Long> {
}
