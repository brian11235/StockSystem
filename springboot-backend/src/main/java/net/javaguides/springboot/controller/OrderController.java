package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.StockOrder;
import net.javaguides.springboot.model.StockOrderLimit;
import net.javaguides.springboot.model.StockPosition;
import net.javaguides.springboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DecimalFormat;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderRepositoryCum orderRepositoryCum;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderLimitRepository orderLimitRepository;

    @Autowired
    private StockPositionRepository stockPositionRepository;

    @Autowired
    private StockRepositoryCum stockRepositoryCum;

    private final DecimalFormat df = new DecimalFormat("#.##");

    @PostMapping("/save")
    public StockOrder save(@RequestBody StockOrder order) {
        double cash = order.getUser().getCash();
        if(order.getType() == 0) {
            order.getUser().setCash(Double.parseDouble(df.format(cash - order.getCost())));
            userRepository.save(order.getUser());
            saveBuyStockPosition(order);
        } else {
            order.getUser().setCash(cash + order.getCost());
            userRepository.save(order.getUser());
            saveSellStockPosition(order);
        }
        return orderRepository.save(order);
    }

    private void saveBuyStockPosition(StockOrder order) {
        StockPosition existStockPos = stockRepositoryCum.findPositionByUserAndStock(order.getUser().getId(),
                order.getStock().getId());
        StockPosition curPos = new StockPosition();
        if(existStockPos != null) {
            curPos.setId(existStockPos.getId());
            curPos.setUser(existStockPos.getUser());
            curPos.setStock(existStockPos.getStock());
            curPos.setQuantity(order.getQuantity() + existStockPos.getQuantity());
            double avgPrice = (existStockPos.getAvgPrice() * existStockPos.getQuantity() + order.getCost()) /
                    (existStockPos.getQuantity() + order.getQuantity());
            curPos.setAvgPrice(Double.parseDouble(df.format(avgPrice)));
        } else {
            curPos.setUser(order.getUser());
            curPos.setStock(order.getStock());
            curPos.setQuantity(order.getQuantity());
            double avgPrice = order.getCost() / order.getQuantity();
            curPos.setAvgPrice(Double.parseDouble(df.format(avgPrice)));
        }
        stockPositionRepository.save(curPos);
    }

    private void saveSellStockPosition(StockOrder order) {
        StockPosition existStockPos = stockRepositoryCum.findPositionByUserAndStock(order.getUser().getId(),
                order.getStock().getId());
        if(existStockPos.getQuantity() == order.getQuantity()) {
            stockPositionRepository.delete(existStockPos);
            return;
        }
        StockPosition curPos = new StockPosition();
        if(existStockPos != null) {
            curPos.setId(existStockPos.getId());
            curPos.setUser(existStockPos.getUser());
            curPos.setStock(existStockPos.getStock());
            curPos.setQuantity(existStockPos.getQuantity() - order.getQuantity());
            double avgPrice = (existStockPos.getAvgPrice() * existStockPos.getQuantity() - order.getCost()) /
                    (existStockPos.getQuantity() - order.getQuantity());
            curPos.setAvgPrice(Double.parseDouble(df.format(avgPrice)));
        }
        stockPositionRepository.save(curPos);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<StockOrder>> findById(@PathVariable Long id) {
        List<StockOrder> stockOrders = orderRepositoryCum.find(id);
        return ResponseEntity.ok(stockOrders);
    }

    @PostMapping("/saveLimit")
    public StockOrderLimit saveLimit(@RequestBody StockOrderLimit limitOrder) {
        return orderLimitRepository.save(limitOrder);
    }

    @GetMapping("/findLimit/{id}")
    public ResponseEntity<List<StockOrderLimit>> findOrderLimitById(@PathVariable Long id) {
        List<StockOrderLimit> stockOrders = orderRepositoryCum.findOrderLimit(id);
        return ResponseEntity.ok(stockOrders);
    }

    @DeleteMapping("/deleteLimit/{id}")
    public ResponseEntity<Boolean> deleteLimitOrderById(@PathVariable Long id) {
        int row = orderRepositoryCum.deleteLimitOrder(id);
        if(row >= 1) {
            return ResponseEntity.ok(true);
        }
        return new ResponseEntity("Delete Error", HttpStatus.NOT_FOUND);
    }
}
