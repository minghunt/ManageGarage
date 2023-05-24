import * as tiencongDAO from '../dao/tiencongDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a TienCong
async function createTienCong(req, res) {
  try {
    const newTienCong = req.body;

    // const existingCar = await carModel.findOne({ TenHieuXe: { $eq: req.body.TenHieuXe } });
    // console.log("existingCar: ", existingCar);
    // if(existingCar) {
    //   console.log("Tên hiệu xe đã tồn tại.");
    //   return res.status(400).json({ error: "TenHieuXe đã tồn tại."});
    // }

    const createdTienCong = await tiencongDAO.createTienCong(newTienCong);
    res.status(201).json(createdTienCong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all TienCong
async function getAllTienCong(req, res) {
  try {
    const TienCong = await tiencongDAO.getAllTienCong();
    // const cars = await carModel.find();
    console.log("Controller. TienCong: ", TienCong);
    res.status(200).json(TienCong);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Update a TienCong
async function updateTienCong(req, res) {
  try {
    const updateTienCong = req.body;
    const TienCong = await tiencongDAO.updateTienCong(updateTienCong);
    if (TienCong) {
      res.status(200).json({message: "Cập nhật thành công"});
    } else {
      res.status(404).json({ error: 'TienCong not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a TienCong
async function deleteTienCong(req, res) {
  try {
    const MaTienCong = req.params.maTienCong;
    console.log("Controller. MaTienCong:", MaTienCong);
    const result = await tiencongDAO.deleteTienCong(MaTienCong);
    console.log("Controller. result:", result);
    
    if(result === 0) {
      return res.status(404).json({ message: "TienCong not found!" });
    }
    res.status(200).json({ message: "TienCong deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createTienCong,
  getAllTienCong,
  updateTienCong,
  deleteTienCong
};

