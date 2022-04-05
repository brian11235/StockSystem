import axios from 'axios';

const TRANSFER_API_BASE_URL = "http://localhost:8080/api/v1/transfer";

class TransferService {

    transfer(transfer) {
        let head = {headers : {'Content-Type': 'application/json'}}
        return axios.post(TRANSFER_API_BASE_URL + "/save", transfer, head)
    }

}

export default new TransferService()