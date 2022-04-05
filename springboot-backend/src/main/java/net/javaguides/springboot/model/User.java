package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "user")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    // 1 admin, 0 member
    @Column(name = "type")
    private Integer type;

    @Column(name = "cash")
    private Double cash;

    @JsonManagedReference(value = "user_order")
    @OneToMany(mappedBy = "user")
    private Set<StockOrder> orders;

    @JsonManagedReference(value = "user_accs")
    @OneToMany(mappedBy = "user")
    private Set<BankAccount> accounts;

    @JsonManagedReference(value = "user_order_limit")
    @OneToMany(mappedBy = "user")
    private Set<StockOrderLimit> orderLimits;

    @JsonManagedReference(value = "user_stock_pos")
    @OneToMany(mappedBy = "user")
    private Set<StockPosition> stockPositions;

    public User() {
    }

    public User(String fullName, String userName, String password, String email, Integer type) {
        this.fullName = fullName;
        this.userName = userName;
        this.password = password;
        this.email = email;
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Double getCash() {
        return cash;
    }

    public void setCash(Double cash) {
        this.cash = cash;
    }

    public Set<StockOrder> getOrders() {
        return orders;
    }

    public void setOrders(Set<StockOrder> orders) {
        this.orders = orders;
    }

    public Set<BankAccount> getAccounts() {
        return accounts;
    }

    public void setAccounts(Set<BankAccount> accounts) {
        this.accounts = accounts;
    }

    public Set<StockOrderLimit> getOrderLimits() {
        return orderLimits;
    }

    public void setOrderLimits(Set<StockOrderLimit> orderLimits) {
        this.orderLimits = orderLimits;
    }

    public Set<StockPosition> getStockPositions() {
        return stockPositions;
    }

    public void setStockPositions(Set<StockPosition> stockPositions) {
        this.stockPositions = stockPositions;
    }
}
