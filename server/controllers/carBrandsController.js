import * as carBrandsDAO from '../dao/carBrandsDAO.js';
import carBrandModel from "../models/carBrandModel.js";

// Create a new car
async function createCarBrand(req, res) {
  try {
    const newCarBrand = req.body;

    // const existingCar = await carModel.findOne({ TenHieuXe: { $eq: req.body.TenHieuXe } });
    // console.log("existingCar: ", existingCar);
    // if(existingCar) {
    //   console.log("Tên hiệu xe đã tồn tại.");
    //   return res.status(400).json({ error: "TenHieuXe đã tồn tại."});
    // }

    const createdCarBrand = await carBrandsDAO.createCarBrand(newCarBrand);
    res.status(201).json(createdCarBrand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all courses
async function getAllCarBrands(req, res) {
  try {
    const carBrands = await carBrandsDAO.getAllCarBrands();
    // const cars = await carModel.find();
    res.status(200).json(carBrands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a course by ID
async function getCarBrandById(req, res) {
  try {
    const carBrandId = req.params.id;
    const carBrand = await carBrandsDAO.getCarBrandById(carBrandId);
    if (carBrand) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'CarBrand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCarBrandByName(req, res) {
  try {
    const name = req.params.name;
    const carBrand = await carBrandsDAO.getCarBrandByName(name);
    if (carBrand) {
      res.status(200).json(carBrand);
    } else {
      res.status(404).json({ error: 'CarBrand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a course by ID
async function updateCarBrand(req, res) {
  try {
    const updateCarBrand = req.body;
    const carBrand = await carBrandsDAO.updateCarBrand(updateCarBrand._id, updateCarBrand.TenHieuXe);
    if (carBrand) {
      res.status(200).json({message: "Cập nhật thành công"});
    } else {
      res.status(404).json({ error: 'CarBrand not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a course by ID
async function deleteCarBrand(req, res) {
  try {
    const MaHieuXe = req.params.maHieuXe;
    console.log("Controller. MaHieuXe:", MaHieuXe);
    const result = await carBrandsDAO.deleteCarBrand(MaHieuXe);
    console.log("Controller. result:", result);
    
    if(result === 0) {
      return res.status(404).json({ message: "HieuXe not found!" });
    }
    res.status(200).json({ message: "HieuXe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createCarBrand,
  getAllCarBrands,
  getCarBrandById,
  getCarBrandByName,
  updateCarBrand,
  deleteCarBrand
};

