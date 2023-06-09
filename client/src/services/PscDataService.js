import axios from "axios";
import { BASE_URL } from "../config/config";

class PscDataService {
    postPSC(data) {
        return axios.post(`${BASE_URL}/api/phieusuachua`, data)
    }
    getPSC() {
        return axios.get(`${BASE_URL}/api/phieusuachua`)
    }
    getctPSC() {
        return axios.get(`${BASE_URL}/api/phieusuachua/ctPSC`)
    }
    getctPSCbyMaXe(MaXe) {
        return axios.get(`${BASE_URL}/api/phieusuachua/${MaXe}`)
    }
}

export default new PscDataService();