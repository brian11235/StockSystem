package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "transfer")
public class Transfer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="amount")
    private Double amount;

    @JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    @Column(name="transfer_date")
    private Date transferDate;

    @OneToOne
    @JoinColumn(name = "from_acc_id")
    private BankAccount fromAccount;

    @OneToOne
    @JoinColumn(name = "to_acc_id")
    private BankAccount toAccount;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Transfer() {
    }

    public Transfer(Double amount, Date transferDate, BankAccount fromAccount, BankAccount toAccount) {
        this.amount = amount;
        this.transferDate = transferDate;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(Date transferDate) {
        this.transferDate = transferDate;
    }

    public BankAccount getFromAccount() {
        return fromAccount;
    }

    public void setFromAccount(BankAccount fromAccount) {
        this.fromAccount = fromAccount;
    }

    public BankAccount getToAccount() {
        return toAccount;
    }

    public void setToAccount(BankAccount toAccount) {
        this.toAccount = toAccount;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
