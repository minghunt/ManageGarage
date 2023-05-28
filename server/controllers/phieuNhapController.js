import * as phieunhapDAO from '../dao/phieunhapDAO.js';
import carBrandModel from "../models/carBrandModel.js";

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

export {
  createphieunhap,
};

