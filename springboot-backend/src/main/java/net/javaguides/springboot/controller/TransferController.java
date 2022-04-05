package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Transfer;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.TransferCashRepository;
import net.javaguides.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/transfer")
public class TransferController {

    @Autowired
    private TransferCashRepository transferCashRepository;

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/save")
    public Transfer transfer(@RequestBody Transfer transfer) {
        double curCash = transfer.getUser().getCash();
        if(transfer.getToAccount().getAccountName().equals("broker")) {
            //Deposit
            transfer.getUser().setCash(curCash + transfer.getAmount());
        } else {
            //Dispense
            transfer.getUser().setCash(curCash - transfer.getAmount());
        }
        userRepository.save(transfer.getUser());
        return transferCashRepository.save(transfer);
    }

}
