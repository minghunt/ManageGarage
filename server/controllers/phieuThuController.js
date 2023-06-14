import * as phieuthuDAO from '../dao/phieuthuDAO.js';
import carBrandModel from "../models/carBrandModel.js";
import phieuthu from '../models/phieuthuModel.js';
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
async function getphieuthu(req, res) {
  try {
    const getphieuthu = await phieuthu.find()
    res.status(201).json(getphieuthu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getphieuthuByMaXe(req, res) {
  try {
    const _MaXe=req.params.MaXe;
    const getphieuthu = await phieuthu.find({MaXe:_MaXe})
    res.status(201).json(getphieuthu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export {
  createphieuthu,getphieuthu,getphieuthuByMaXe
};

