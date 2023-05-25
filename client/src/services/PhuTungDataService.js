import axios from "axios";
import { BASE_URL } from "../config/config";

class PhuTungDataService {
    getAllPhuTung() {
        return axios.get(`${BASE_URL}/api/phutung`)
    }
    createPhuTung(data){
        return axios.post(`${BASE_URL}/api/phutung`, data)
    }
    updatePhuTung(data){
        return axios.put(`${BASE_URL}/api/phutung`,data)
    }
    // Xóa HieuXe bằng MaHieuXe
    deletePhuTung(MaPhuTung) {
        return axios.delete(`${BASE_URL}/api/phutung/${MaPhuTung}`)
    }
}

export default new PhuTungDataService();