package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.MarketHour;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketHourRepository extends JpaRepository<MarketHour, Long> {
}
