package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Stock;
import net.javaguides.springboot.model.StockOrder;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;
import net.javaguides.springboot.model.StockPosition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signUp")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping("/name/{userName}")
    public ResponseEntity<User> getUserByUserName(@PathVariable String userName) {
        User user = userRepository.findByUserName(userName);
        if(user != null) {
            return ResponseEntity.ok(user);
        }
        return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if(userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        }
        return new ResponseEntity("User not found", HttpStatus.NOT_FOUND);
    }

//    @GetMapping("stockPosition/{id}")
//    public ResponseEntity<Set<StockPosition>> getStockPosition(@PathVariable Long id) {
//        Map<Long, StockPosition> stockMap = new HashMap<>();
//        Optional<User> userOpt = userRepository.findById(id);
//        if(userOpt.isPresent()) {
//            for (StockOrder order : userOpt.get().getOrders()) {
//                Stock stock = order.getStock();
//                StockPosition sp = stockMap.getOrDefault(stock.getId(), null);
//                if(sp == null) {
//                    sp = new StockPosition();
//                    sp.setId(stock.getId());
//                    sp.setCompanyName(stock.getCompanyName());
//                    sp.setTicker(stock.getTicker());
//                    sp.setQuantity(order.getQuantity());
//                    sp.setPrice(stock.getCurPrice());
//                    stockMap.put(stock.getId(), sp);
//                } else {
//                    sp.setQuantity(sp.getQuantity() + order.getQuantity());
//                }
//            }
//        }
//        return ResponseEntity.ok(new HashSet<>(stockMap.values()));
//    }
}
