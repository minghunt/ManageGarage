
import carModel from '../models/carModel.js';

// Create a new car
const createCar = async (carData) => {
  try {
        const newCar = new carModel(carData);
        const savedCar = await newCar.save();
        return savedCar;
  } 
  catch (error) {
    throw error;
  }
};

// Get all cars
const getAllCars = async ({filters = null}={}) => {

  let query;
  if(filters) {
    if('MaHieuXe' in filters) {
      query = { "MaHieuXe": { $eq: filters["MaHieuXe"]} }
    }else if("TenKH" in filters) {
      query = { $text: { $search: filters['TenKH'] } };
    }else if("TienNo" in filters) {
      query = { "TienNo": { $lte: filters['TienNo'] } }
    }
  }

  try {
    const carList = await carModel.find(query);
    return carList;
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
// Check for BienSo is exist
const checkBienSo = async (BienSo) =>{
    try{
        const isBienSo = await carModel.findOne({ BienSo: BienSo }).exec();
        return isBienSo;
    }catch(error){
        console.log(1);
        throw error;
    }
};
export {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  checkBienSo
};

