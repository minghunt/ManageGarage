import axios from "axios";
import { BASE_URL } from "../config/config";

class UserDataService {
    putPassword(email, currentPassword, newPassword) {
        return axios.put(`${BASE_URL}/api/users/${email}/change-password`, { currentPassword, newPassword })
    }
    getAllUser(){
        return axios.get(`${BASE_URL}/api/users/`)
    }
    createUser(email, userName, phoneNumber, password, userRole){
        return axios.post(`${BASE_URL}/api/users/`, {email, userName, phoneNumber, password, userRole});
    }
    updateUser(email, userData){
        return axios.put(`${BASE_URL}/api/users/${email}`, userData);
    }
    deleteUser(email){
        return axios.delete(`${BASE_URL}/api/users/${email}`)
    }
}

export default new UserDataService();