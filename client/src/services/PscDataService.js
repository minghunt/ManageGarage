import axios from "axios";
import { BASE_URL } from "../config/config";

class PscDataService {
    postPSC(data) {
        return axios.post(`${BASE_URL}/api/phieusuachua`, data)
    }
}

export default new PscDataService();