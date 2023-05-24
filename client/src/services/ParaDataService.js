import axios from "axios";
import { BASE_URL } from "../config/config";

class ParaDataService {
    getPara() {
        return axios.get(`${BASE_URL}/api/Para`)
    }
    updatePara(data){
        return axios.put(`${BASE_URL}/api/Para`,data)
    }

}

export default new ParaDataService();