package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Stock;
import net.javaguides.springboot.model.StockOrderLimit;
import net.javaguides.springboot.model.StockPosition;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional(readOnly = true)
public class StockRepositoryCum {
    @PersistenceContext
    EntityManager entityManager;

    public List<Stock> findByCNameOrTicker(String ide) {
        Query query = entityManager.createNativeQuery("SELECT * FROM Stock as s " +
                "WHERE s.company_name LIKE ? or s.ticker Like ?", Stock.class);
        query.setParameter(1, "%" + ide + "%");
        query.setParameter(2, "%" + ide + "%");
        return query.getResultList();
    }

    public List<StockPosition> findPositionByUser(Long user_id) {
        Query query = entityManager.createNativeQuery("SELECT * FROM stock_position as s " +
                "WHERE s.user_id = ?", StockPosition.class);
        query.setParameter(1, user_id);
        return query.getResultList();
    }

    public StockPosition findPositionByUserAndStock(Long user_id, Long stock_id) {
        Query query = entityManager.createNativeQuery("SELECT * FROM stock_position as s " +
                "WHERE s.user_id = ? and s.stock_id = ?", StockPosition.class);
        query.setParameter(1, user_id);
        query.setParameter(2, stock_id);
        StockPosition stockPosition = null;
        try {
            stockPosition = (StockPosition) query.getSingleResult();
        } catch (NoResultException e) {
            System.out.println(e);
        }
        return stockPosition;
    }
}
