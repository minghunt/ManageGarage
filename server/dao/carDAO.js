
import carModel from '../models/carModel.js';

// Create a new car
const createCar = async (carData) => {
  try {
    const isCarExist = await carModel.findOne({ BienSo: carData.BienSo }).exec();
    if(isCarExist)
    {
        return isCarExist._id;
    }
    else{
        const newCar = new carModel(carData);
        const savedCar = await newCar.save();
        return savedCar;
    }
  } catch (error) {
    throw error;
  }
};

// Get all cars
const getAllCars = async () => {
  try {
    const cars = await carModel.find();
    console.log("DAO. cars: ", cars);
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
// Update car data
const updateCar = async (carData) => {
  try {
    const updatedCar = await carModel.findOneAndUpdate({_id:carData._id},carData);
    return updatedCar;
  } catch (error) {
    throw error;
  }
};

export {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
};

