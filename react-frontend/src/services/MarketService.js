import axios from 'axios';

const MARKET_API_BASE_URL = "http://localhost:8080/api/v1/market";

class MarketService {

    findAllHoliday() {
        return axios.get(MARKET_API_BASE_URL + "/holiday/findAll")
    }

    findMarketHours() {
        return axios.get(MARKET_API_BASE_URL + "/find/1");
    }

    save(marketHours) {
        let head = {headers : {'Content-Type': 'application/json'}}
        return axios.post(MARKET_API_BASE_URL + "/save", marketHours, head)
    }

}

export default new MarketService()