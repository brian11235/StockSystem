import axios from 'axios';
import qs from "qs";

const STOCK_API_BASE_URL = "http://localhost:8080/api/v1/stocks";

class StockService {

    getAllStocks() {
        return axios.get(STOCK_API_BASE_URL + "/findAll/");
    }

    createStock(stock) {
        return axios.post(STOCK_API_BASE_URL + "/create/" , stock);
    }

    getStockById(stockId) {
        return axios.get(STOCK_API_BASE_URL + '/id/' + stockId);
    }

    getStockByIds(stockIds) {
        let params = ''
        stockIds.map((s, idx) => {
            if(idx === 0) {
                params += s
            } else {
                params += "," + s
            }
        });
        return axios.get(STOCK_API_BASE_URL + '/ids/?ids=' + params);
    }

    getStockByTickerOrComName(identifier) {
        return axios.get(STOCK_API_BASE_URL + "/identifier/" + identifier);
    }

    // saveStockPosition(stockPosition) {
    //     return axios.post(STOCK_API_BASE_URL + "/stockPosition/save", stockPosition);
    // }
    //

    findStockPosition(userId) {
        return axios.get(STOCK_API_BASE_URL + "/stockPosition/" + userId);
    }

}

export default new StockService()