import carModel from '../models/carModel.js';

// Create a new cars
const createCar = async (carData) => {
  try {
    const newCar = new carModel(carData);
    const savedCar = await newCar.save();
    return savedCar;
  } catch (error) {
    throw error;
  }
};

// Get all cars
const getAllCars = async () => {
  try {
    const cars = await carModel.find();
    console.log("DAO. Cars: ", cars);
    return cars;
  } catch (error) {
    throw error;
  }
};
// Get a car by ID
const getCarById = async (carId) => {
  try {
    const car = await carModel.findById(carId);
    return car;
  } catch (error) {
    throw error;
  }
};
const getCarByName = async (Name) => {
  try {
    const car = await carModel.find({TenHieuXe: { $regex: Name, $options: "i" }});
    return car;
  } catch (error) {
    throw error;
  }
};
// Update car data
const updateCar = async (carId, carData) => {
  try {
    const updatedCar = await carModel.findByIdAndUpdate(carId, carData, { new: true });
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

// Delete a car
const deleteCar = async (MaHieuXe) => {
  try {
    const result = await carModel.deleteOne({ MaHieuXe: MaHieuXe });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

export {
  createCar,
  getAllCars,
  getCarById,
  getCarByName,
  updateCar,
  deleteCar
};

