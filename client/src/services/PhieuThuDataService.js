import axios from "axios";
import { BASE_URL } from "../config/config";

class PhieuThuDataService {

    createPhieuThu(data){
        return axios.post(`${BASE_URL}/api/phieuthu`, data)
    }

}

export default new PhieuThuDataService();