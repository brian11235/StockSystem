package net.javaguides.springboot.controller;

import java.util.List;

import net.javaguides.springboot.model.StockPosition;
import net.javaguides.springboot.repository.StockPositionRepository;
import net.javaguides.springboot.repository.StockRepositoryCum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Stock;
import net.javaguides.springboot.repository.StockRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/stocks")
public class StockController {

	@Autowired
	private StockRepository stockRepository;

	@Autowired
	private StockRepositoryCum stockRepositoryCum;

	@Autowired
	private StockPositionRepository stockPositionRepository;

	@GetMapping("/findAll")
	public List<Stock> findAll(){
		return stockRepository.findAll();
	}		

	@PostMapping("/create")
	public Stock create(@RequestBody Stock stock) {
		stock.setCurPrice(stock.getStartPrice());
		stock.setLowPrice(stock.getStartPrice());
		stock.setHighPrice(stock.getStartPrice());
		return stockRepository.save(stock);
	}

	@GetMapping("/id/{id}")
	public ResponseEntity<Stock> findById(@PathVariable Long id) {
		Stock stock = stockRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Stock not exist with id :" + id));
		return ResponseEntity.ok(stock);
	}

	@GetMapping("/ids")
	public ResponseEntity<List<Stock>> findByIds(@RequestParam List<Long> ids) {
		List<Stock> stock = stockRepository.findAllById(ids);
		if(stock.isEmpty()) {
			return new ResponseEntity("Stock Not Found", HttpStatus.NOT_FOUND);
		}
		return ResponseEntity.ok(stock);
	}

	@GetMapping("/identifier/{ide}")
	public ResponseEntity<List<Stock>> findByCNameOrTicker(@PathVariable String ide) {
		List<Stock> stocks = stockRepositoryCum.findByCNameOrTicker(ide);
		return ResponseEntity.ok(stocks);
	}

//	@PostMapping("/stockPosition/save")
//	public StockPosition saveStockPosition(@RequestBody StockPosition position) {
//		return stockPositionRepository.save(position);
//	}
//
	@GetMapping("/stockPosition/{id}")
	public ResponseEntity<List<StockPosition>> findStockPosition(@PathVariable Long id) {
		List<StockPosition> stockPositions = stockRepositoryCum.findPositionByUser(id);
		return ResponseEntity.ok(stockPositions);
	}

}
