package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "stock")
public class Stock {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "company_name")
	private String companyName;

	@Column(name = "ticker")
	private String ticker;
	
	@Column(name = "volume")
	private Integer volume;

	@Column(name = "start_price")
	private double startPrice;

	@Column(name = "high_price")
	private double highPrice;

	@Column(name = "low_price")
	private double lowPrice;

	@Column(name = "cur_price")
	private double curPrice;

	public Stock() {
	}

	public Stock(String companyName,
				 String ticker,
				 Integer volume,
				 double startPrice,
				 double lowPrice,
				 double highPrice,
				 double curPrice) {
		this.companyName = companyName;
		this.ticker = ticker;
		this.volume = volume;
		this.startPrice = startPrice;
		this.lowPrice = lowPrice;
		this.highPrice = highPrice;
		this.curPrice = curPrice;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getTicker() {
		return ticker;
	}

	public void setTicker(String ticker) {
		this.ticker = ticker;
	}

	public Integer getVolume() {
		return volume;
	}

	public void setVolume(Integer volume) {
		this.volume = volume;
	}

	public double getStartPrice() {
		return startPrice;
	}

	public void setStartPrice(double startPrice) {
		this.startPrice = startPrice;
	}

	public double getHighPrice() {
		return highPrice;
	}

	public void setHighPrice(double highPrice) {
		this.highPrice = highPrice;
	}

	public double getLowPrice() {
		return lowPrice;
	}

	public void setLowPrice(double lowPrice) {
		this.lowPrice = lowPrice;
	}

	public double getCurPrice() {
		return curPrice;
	}

	public void setCurPrice(double curPrice) {
		this.curPrice = curPrice;
	}

}
