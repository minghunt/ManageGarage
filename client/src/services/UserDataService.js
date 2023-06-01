import axios from "axios";
import { BASE_URL } from "../config/config";

class PscDataService {
    putPassword(email, currentPassword, newPassword) {
        return axios.put(`${BASE_URL}/api/users/${email}/change-password`, { currentPassword, newPassword })
    }
}

export default new PscDataService();