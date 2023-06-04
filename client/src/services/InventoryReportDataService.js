import axios from "axios";
import { BASE_URL } from "../config/config";

class InventoryReportDataService {

    getInventoryReport(month,year){
        return axios.get(`${BASE_URL}/api/baocaoton?month=${month}&year=${year}`)
    }

}

export default new InventoryReportDataService();