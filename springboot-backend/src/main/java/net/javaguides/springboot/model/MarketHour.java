package net.javaguides.springboot.model;

import javax.persistence.*;

@Entity
@Table(name = "market_hour")
public class MarketHour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column
    private Integer startTime;

    @Column
    private Integer endTime;

    @Column
    private String openDays;

    public MarketHour() {
    }

    public MarketHour(Integer startTime, Integer endTime, String openDays) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.openDays = openDays;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public String getOpenDays() {
        return openDays;
    }

    public void setOpenDays(String openDays) {
        this.openDays = openDays;
    }
}
