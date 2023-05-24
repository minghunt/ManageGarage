import axios from "axios";
import { BASE_URL } from "../config/config";

class CarBrandDataService {
    getAllCarBrands() {
        return axios.get(`${BASE_URL}/api/cars-brand`)
    }
    createCarBrand(TenHieuXe){
        return axios.post(`${BASE_URL}/api/cars-brand`, ({ TenHieuXe }))
    }
    updateCarBrand(data){
        return axios.put(`${BASE_URL}/api/cars-brand`,data)
    }
    // Xóa HieuXe bằng MaHieuXe
    deleteCarBrand(MaHieuXe) {
        return axios.delete(`${BASE_URL}/api/cars-brand/${MaHieuXe}`)
    }
}

export default new CarBrandDataService();