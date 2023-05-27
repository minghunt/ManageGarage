import * as phutungDAO from '../dao/phutungDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a PhuTung
async function createPhuTung(req, res) {
  try {
    const newPhuTung = req.body;
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
    const result = await phutungDAO.deletePhuTung(MaPhuTung);
    
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

