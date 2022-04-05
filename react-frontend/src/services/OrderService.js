import axios from 'axios';

const ORDER_API_BASE_URL = "http://localhost:8080/api/v1/order";

class OrderService {

    save(order) {
        let head = {headers : {'Content-Type': 'application/json'}}
        return axios.post(ORDER_API_BASE_URL + "/save", order, head)
    }

    find(id) {
        return axios.get(ORDER_API_BASE_URL + "/find/" + id )
    }

    saveLimit(limitOrder) {
        let head = {headers : {'Content-Type': 'application/json'}}
        return axios.post(ORDER_API_BASE_URL + "/saveLimit", limitOrder, head)
    }

    findLimit(id) {
        return axios.get(ORDER_API_BASE_URL + "/findLimit/" + id )
    }

    deleteLimit(id) {
        return axios.delete(ORDER_API_BASE_URL + "/deleteLimit/" + id)
    }

}

export default new OrderService()