package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<StockOrder, Long> {
}
