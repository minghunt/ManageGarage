import axios from "axios";
import { BASE_URL } from "../config/config";

class PhieuNhapDataService {

    createPhieuNhap(data){
        return axios.post(`${BASE_URL}/api/phieunhap`, data)
    }
    getctPhieuNhap(){
        return axios.get(`${BASE_URL}/api/phieunhap/ctphieunhap`)
    }
}

export default new PhieuNhapDataService();