import * as phieunhapDAO from '../dao/phieunhapDAO.js';
import carBrandModel from "../models/carBrandModel.js";
import ct_phieunhap from '../models/CT_phieunhapModel.js';
// Create a phieunhap
async function createphieunhap(req, res) {
  try {
    const newphieunhap = req.body;
    const createdphieunhap = await phieunhapDAO.createPhieuNhap(newphieunhap);
    res.status(201).json(createdphieunhap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// get chi tiet phieunhap
async function getctphieunhap(req, res) {
  try {
    const ctphieunhap=await ct_phieunhap.find()
    res.status(200).json(ctphieunhap);

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
export {
  createphieunhap,getctphieunhap
};

