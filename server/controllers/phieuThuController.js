import * as phieuthuDAO from '../dao/phieuthuDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a phieuthu
async function createphieuthu(req, res) {
  try {
    const newphieuthu = req.body;
    const createdphieuthu = await phieuthuDAO.createPhieuThu(newphieuthu);
    res.status(201).json(createdphieuthu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createphieuthu,
};

