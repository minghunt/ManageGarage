import * as revenueDAO from '../dao/revenueDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a phieuthu
async function getrevenueReport(req, res) {
  try {
    const newerevenueReport = req.body;
    const createderevenueReport= await revenueDAO.getrevenueReport(newerevenueReport);
    res.status(200).json(createderevenueReport);
  } catch (error) {
    //res.status(500).json({ error: error.message });
  }
}

export {
  getrevenueReport,
};



