package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.StockOrder;
import net.javaguides.springboot.model.StockOrderLimit;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class OrderRepositoryCum {

    @PersistenceContext
    EntityManager entityManager;

    public List<StockOrder> find(Long id) {
        Query query = entityManager.createNativeQuery("SELECT * FROM stock_order as s " +
                "WHERE s.user_id = ?", StockOrder.class);
        query.setParameter(1, id);
        return query.getResultList();
    }

    public List<StockOrderLimit> findOrderLimit(Long id) {
        Query query = entityManager.createNativeQuery("SELECT * FROM stock_order_limit as s " +
                "WHERE s.user_id = ? order by s.expired_date", StockOrderLimit.class);
        query.setParameter(1, id);
        return query.getResultList();
    }

    public int deleteLimitOrder(Long id) {
        Query query = entityManager.createNativeQuery("Delete FROM stock_order_limit as s " +
                "WHERE s.id = ? ", StockOrderLimit.class);
        query.setParameter(1, id);
        return query.executeUpdate();
    }
}
