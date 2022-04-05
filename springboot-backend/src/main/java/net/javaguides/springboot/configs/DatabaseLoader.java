package net.javaguides.springboot.configs;

import net.javaguides.springboot.model.*;
import net.javaguides.springboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final StockRepository stockRepository;
    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;
    private final HolidayRepository holidayRepository;
    private final MarketHourRepository marketHourRepository;

    @Autowired
    public DatabaseLoader(StockRepository stockRepository,
                          UserRepository userRepository,
                          BankAccountRepository bankAccountRepository,
                          HolidayRepository holidayRepository,
                          MarketHourRepository marketHourRepository) {
        this.stockRepository = stockRepository;
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.holidayRepository = holidayRepository;
        this.marketHourRepository = marketHourRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stock intel = new Stock("Intel", "INTC", 100, 100, 100, 100, 100);
        stockRepository.save(intel);
        User admin = new User("Admin", "admin", "123", "admin@gmail.com", 1);
        userRepository.save(admin);
        User tUSer = new User("BrianLin", "user", "123", "brian@gmail.com", 0);
        tUSer.setCash(0.0);
        userRepository.save(tUSer);
        BankAccount stockAcc = new BankAccount("broker", tUSer);
        BankAccount savingAcc = new BankAccount("saving", tUSer);
        bankAccountRepository.save(stockAcc);
        bankAccountRepository.save(savingAcc);
        Holiday cd = new Holiday(12,25,"Christmas Day");
        Holiday nd = new Holiday(1,1,"New Year's Day");
        holidayRepository.save(cd);
        holidayRepository.save(nd);
        MarketHour mh = new MarketHour(9, 17, "MON-FRI");
        marketHourRepository.save(mh);

    }
}
