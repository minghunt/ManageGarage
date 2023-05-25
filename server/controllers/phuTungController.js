import * as phutungDAO from '../dao/phutungDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a PhuTung
async function createPhuTung(req, res) {
  try {
    const newPhuTung = req.body;

    // const existingCar = await carModel.findOne({ TenHieuXe: { $eq: req.body.TenHieuXe } });
    // console.log("existingCar: ", existingCar);
    // if(existingCar) {
    //   console.log("Tên hiệu xe đã tồn tại.");
    //   return res.status(400).json({ error: "TenHieuXe đã tồn tại."});
    // }

    const createdPhuTung = await phutungDAO.createPhuTung(newPhuTung);
    res.status(201).json(createdPhuTung);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all PhuTung
async function getAllPhuTung(req, res) {
  try {
    const PhuTung = await phutungDAO.getAllPhuTung();
    // const cars = await carModel.find();
    console.log("Controller. PhuTung: ", PhuTung);
    res.status(200).json(PhuTung);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Update a PhuTung
async function updatePhuTung(req, res) {
  try {
    const updatePhuTung = req.body;
    const PhuTung = await phutungDAO.updatePhuTung(updatePhuTung);
    if (PhuTung) {
      res.status(200).json({message: "Cập nhật thành công"});
    } else {
      res.status(404).json({ error: 'PhuTung not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a PhuTung
async function deletePhuTung(req, res) {
  try {
    const MaPhuTung = req.params.maPhuTung;
    console.log("Controller. MaPhuTung:", MaPhuTung);
    const result = await phutungDAO.deletePhuTung(MaPhuTung);
    console.log("Controller. result:", result);
    
    if(result === 0) {
      return res.status(404).json({ message: "PhuTung not found!" });
    }
    res.status(200).json({ message: "PhuTung deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createPhuTung,
  getAllPhuTung,
  updatePhuTung,
  deletePhuTung
};

