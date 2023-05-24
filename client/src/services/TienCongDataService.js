import axios from "axios";
import { BASE_URL } from "../config/config";

class CarBrandDataService {
    getAllTienCong() {
        return axios.get(`${BASE_URL}/api/tiencong`)
    }
    createTienCong(data){
        return axios.post(`${BASE_URL}/api/tiencong`, data)
    }
    updateTienCong(data){
        return axios.put(`${BASE_URL}/api/tiencong`,data)
    }
    // Xóa HieuXe bằng MaHieuXe
    deleteTienCong(MaTienCong) {
        return axios.delete(`${BASE_URL}/api/tiencong/${MaTienCong}`)
    }
}

export default new CarBrandDataService();