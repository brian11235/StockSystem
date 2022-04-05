// import axios from 'axios';
//
// const CRED_API_BASE_URL = "http://localhost:8080/api/v1/loginCred";
// export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
//
// class AuthService {
//
//     executeAuthService(userName, password) {
//         return axios.get(CRED_API_BASE_URL,
//             { headers: { authorization: this.createAuthToken(userName, password) } }
//         );
//     }
//
//     createAuthToken(userName, password) {
//         return 'Basic ' + window.btoa(userName + ":" + password)
//     }
//
//     registerSuccessfulLogin(userName, password) {
//         sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, userName)
//         this.setupAxiosInterceptors(this.createAuthToken(userName, password))
//     }
//
//     logout() {
//         sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
//     }
//
//     isUserLoggedIn() {
//         let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
//         if (user === null) return false
//         return true
//     }
//
//     setupAxiosInterceptors(token) {
//         axios.interceptors.request.use(
//             (config) => {
//                 if (this.isUserLoggedIn()) {
//                     config.headers.authorization = token
//                 }
//                 return config
//             }
//         )
//     }
//
// }
//
// export default new AuthService()