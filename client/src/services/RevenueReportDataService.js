import axios from "axios";
import { BASE_URL } from "../config/config";

class RevenueReportDataServiceDataService {

    getRevenueReport(data){
        return axios.post(`${BASE_URL}/api/baocaodoanhthu`, data)
    }

}

export default new RevenueReportDataServiceDataService();