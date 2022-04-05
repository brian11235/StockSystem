package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Transfer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferCashRepository extends JpaRepository<Transfer, Long> {

}
