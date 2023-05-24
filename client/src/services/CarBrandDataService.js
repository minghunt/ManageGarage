import axios from "axios";
import { BASE_URL } from "../../config/config";

class CarBrandDataService {
    getAllCars() {
        return axios.get(`${BASE_URL}/api/cars`)
    }
    getCarById(id){
        return axios.get(`${BASE_URL}/api/cars/${id}`)
    } 
    getCarByName(TenHieuXe){
        return axios.get(`${BASE_URL}/api/cars/name/${TenHieuXe}`)
    }
    createCar(TenHieuXe){
        return axios.post(`${BASE_URL}/api/cars`, ({ TenHieuXe }))
    }
    updateCar(){
        return axios.put(`${BASE_URL}/api/cars`)
    }
    // Xóa HieuXe bằng MaHieuXe
    deleteCar(MaHieuXe) {
        return axios.delete(`${BASE_URL}/api/cars/${MaHieuXe}`)
    }
}

export default new CarBrandDataService();