package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Holiday;
import net.javaguides.springboot.model.MarketHour;
import net.javaguides.springboot.repository.HolidayRepository;
import net.javaguides.springboot.repository.MarketHourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/market")
public class MarketController {

    @Autowired
    private HolidayRepository holidayRepository;

    @Autowired
    private MarketHourRepository marketHourRepository;

    @GetMapping("/holiday/findAll")
    public List<Holiday> findAll(){
        return holidayRepository.findAll();
    }

    @GetMapping("/find/{id}")
    public MarketHour findMarketHours(@PathVariable Long id){
        return marketHourRepository.findById(id).orElse(new MarketHour());
    }

    @PostMapping("/save")
    public MarketHour save(@RequestBody MarketHour marketHour) {
        marketHour.setId(1);
        return marketHourRepository.save(marketHour);
    }

}
