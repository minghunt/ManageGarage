import axios from "axios";
import { BASE_URL } from "../config/config";

class CarDataService {
    getAllCar() {
        return axios.get(`${BASE_URL}/api/car`)
    }
    getAllCarFilter(BienSo,TenKH,DienThoai,MaHieuXe,NgayNhan) {
        return axios.get(`${BASE_URL}/api/car?BienSo=${BienSo}&TenKH=${TenKH}&DienThoai=${DienThoai}&MaHieuXe=${MaHieuXe}&NgayNhan=${NgayNhan}`)
    }
    createCar(data){
        return axios.post(`${BASE_URL}/api/car`, data)
    }
    updateCar(data){
        return axios.put(`${BASE_URL}/api/tiencong`,data)
    }

}

export default new CarDataService();