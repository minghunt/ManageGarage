import carBrandModel from '../models/carBrandModel.js';

// Create a new carBrands
const createCarBrand = async (carBrandData) => {
  try {
    const newCarBrand = new carBrandModel(carBrandData);
    const savedCarBrand = await newCarBrand.save();
    return savedCarBrand;
  } catch (error) {
    throw error;
  }
};

// Get all carBrands
const getAllCarBrands = async () => {
  try {
    const carBrands = await carBrandModel.find();
    return carBrands;
  } catch (error) {
    throw error;
  }
};
// Get a carBrand by ID
const getCarBrandById = async (carBrandId) => {
  try {
    const carBrand = await carBrandModel.findById(carBrandId);
    return car;
  } catch (error) {
    throw error;
  }
};
const getCarBrandByName = async (Name) => {
  try {
    const carBrand = await carBrandModel.find({TenHieuXe: { $regex: Name, $options: "i" }});
    return carBrand;
  } catch (error) {
    throw error;
  }
};
// Update carBrand data
const updateCarBrand = async (carBrandId, carBrandData) => {
  try {
    const updatedCarBrand = await carBrandModel.updateOne({_id: carBrandId}, {TenHieuXe: carBrandData});
    return updatedCarBrand;
  } catch (error) {
    throw error;
  }
};

// Delete a carBrand
const deleteCarBrand = async (MaHieuXe) => {
  try {
    const result = await carBrandModel.deleteOne({ MaHieuXe: MaHieuXe });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

export {
  createCarBrand,
  getAllCarBrands,
  getCarBrandById,
  getCarBrandByName,
  updateCarBrand,
  deleteCarBrand
};

