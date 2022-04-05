package net.javaguides.springboot.scheduler;

import net.javaguides.springboot.model.MarketHour;
import net.javaguides.springboot.model.StockOrder;
import net.javaguides.springboot.model.StockOrderLimit;
import net.javaguides.springboot.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@EnableScheduling
public class ExecuteLimitOrderTask implements SchedulingConfigurer {

    @Autowired
    private OrderLimitRepository orderLimitRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MarketHourRepository marketHourRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        scheduledTaskRegistrar.addTriggerTask(() -> process(),
                triggerContext -> {
                    return new CronTrigger(findMarketTime()).nextExecutionTime(triggerContext);
        });
    }

    //"*/5 * 9-17 * * MON-FRI"
    private String findMarketTime() {
        MarketHour mh = marketHourRepository.findById(new Long(1)).orElse(null);
        if (mh != null) {
            return "*/5 *" + mh.getStartTime() + "-" + mh.getEndTime() + "* *" + mh.getOpenDays();
        }
        return "*/5 * * * * ?";
    }

    private void process() {
        List<StockOrderLimit> orderLimits = orderLimitRepository.findAll();
        for(StockOrderLimit orderLimit : orderLimits) {
            double curPrice = orderLimit.getStock().getCurPrice();
            double desiredPrice = orderLimit.getDesiredPrice();
            double cash = orderLimit.getUser().getCash();
            // buy
            if(orderLimit.getType() == 0) {
                if (curPrice <= desiredPrice && cash >= orderLimit.getCost()) {
                    StockOrder order = new StockOrder();
                    order.setUser(orderLimit.getUser());
                    order.setStock(orderLimit.getStock());
                    order.setCost(orderLimit.getCost());
                    order.setQuantity(orderLimit.getQuantity());
                    order.setType(orderLimit.getType());
                    orderRepository.save(order);
                    orderLimit.getUser().setCash(cash - orderLimit.getCost());
                    //update Cash
                    userRepository.save(orderLimit.getUser());
                    //Delete this limit order
                    orderLimitRepository.delete(orderLimit);
                }
            } else {

            }
        }
    }

}
