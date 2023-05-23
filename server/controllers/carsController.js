import * as carsDAO from '../dao/carsDAO.js';
import carModel from "../models/carModel.js";

// Create a new car
async function createCar(req, res) {
  try {
    const newCar = req.body;

    // const existingCar = await carModel.findOne({ TenHieuXe: { $eq: req.body.TenHieuXe } });
    // console.log("existingCar: ", existingCar);
    // if(existingCar) {
    //   console.log("Tên hiệu xe đã tồn tại.");
    //   return res.status(400).json({ error: "TenHieuXe đã tồn tại."});
    // }

    const createdCar = await carsDAO.createCar(newCar);
    res.status(201).json(createdCar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all courses
async function getAllCars(req, res) {
  try {
    const cars = await carsDAO.getAllCars();
    // const cars = await carModel.find();
    console.log("Controller. Cars: ", cars);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a course by ID
async function getCarById(req, res) {
  try {
    const carId = req.params.id;
    const car = await carsDAO.getCarById(carId);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCarByName(req, res) {
  try {
    const name = req.params.name;
    const car = await carsDAO.getCarByName(name);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a course by ID
async function updateCar(req, res) {
  try {
    const carId = req.params.id;
    const updatedCar = req.body;
    const car = await carsDAO.updateCourse(carId, updatedCar);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a course by ID
async function deleteCar(req, res) {
  try {
    const MaHieuXe = req.params.maHieuXe;
    console.log("Controller. MaHieuXe:", MaHieuXe);
    const result = await carsDAO.deleteCar(MaHieuXe);
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
  createCar,
  getAllCars,
  getCarById,
  getCarByName,
  updateCar,
  deleteCar
};

