import axios from "axios";
import { BASE_URL } from "../config/config";

class CarDataService {
    getAllCar(BienSo=null,DienThoai=null,NgayNhan=null) {
        return axios.get(`${BASE_URL}/api/car?BienSo=${BienSo}&DienThoai=${DienThoai}&NgayNhan=${NgayNhan}`)
    }
    createCar(data){
        return axios.post(`${BASE_URL}/api/car`, data)
    }
    updateCar(data){
        return axios.put(`${BASE_URL}/api/tiencong`,data)
    }

}

export default new CarDataService();