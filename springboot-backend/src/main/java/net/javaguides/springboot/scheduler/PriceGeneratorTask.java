package net.javaguides.springboot.scheduler;

import net.javaguides.springboot.model.Stock;
import net.javaguides.springboot.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import java.text.DecimalFormat;
import java.util.List;

@Component
@EnableScheduling
public class PriceGeneratorTask implements SchedulingConfigurer {

    @Autowired
    private StockRepository stockRepository;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        scheduledTaskRegistrar.addTriggerTask(() -> process(),
                triggerContext -> {
                    return new CronTrigger("*/5 * * * * ?").nextExecutionTime(triggerContext);
        });
    }

    private void process() {
        List<Stock> stocks = stockRepository.findAll();
        stocks.forEach(
                stock -> {
                    double newPrice = calculate(stock.getCurPrice());
                    if(newPrice > stock.getHighPrice()) {
                        stock.setHighPrice(newPrice);
                    } else if (newPrice < stock.getLowPrice()) {
                        stock.setLowPrice(newPrice);
                    }
                    stock.setCurPrice(newPrice);
                    stockRepository.save(stock);
                }
        );
    }

    private double calculate(double curPrice) {
        DecimalFormat df = new DecimalFormat("#.##");
        double upper = 1;
        double lower = -1;
        return Double.parseDouble(df.format(curPrice + (Math.random() * (upper - lower)) + lower));
    }
}
