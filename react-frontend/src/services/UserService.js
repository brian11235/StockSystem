import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";

class UserService {

    createUser(user) {
        return axios.post(USER_API_BASE_URL + "/" + "signUp", user);
    }

    getUserByUserName(userName) {
        return axios.get(USER_API_BASE_URL + '/name/' + userName);
    }

    getUserById(id) {
        return axios.get(USER_API_BASE_URL + '/id/' + id);
    }

    getStockPosition(userId) {
        return axios.get(USER_API_BASE_URL + "/stockPosition/" + userId);
    }
}

export default new UserService()