
import carModel from '../models/carModel.js';

// Create a new car
const createCar = async (carData) => {
  try {
        const isCarExist =  await carModel.findOne({ BienSo: carData.BienSo }).exec();
        if (isCarExist) {
          const updatedCar = await carModel.findOneAndUpdate({_id:isCarExist._id},carData);
          return updatedCar;
        }
        else{
          const newCar = new carModel(carData);
          const savedCar = await newCar.save();
          return savedCar;
        }
  } 
  catch (error) {
    throw error;
  }
};

// Get all cars
const getAllCars = async ({filters = null}={}) => {

  let query = {};
  if(filters) {
    if(filters.TenKH) {
      query = { $text: { $search: filters.TenKH } }
    }
    if (filters.BienSo){
      query.BienSo = filters.BienSo
    }
    if(filters.MaHieuXe) {
      query.MaHieuXe= filters.MaHieuXe
      console.log(query.MaHieuXe)
    }
    if(filters.NgayNhan) {
      const NgayTN = new Date(filters.NgayNhan);
      let tomorrow = new Date(NgayTN)
      query.NgayNhan = {
        $gte: new Date(tomorrow.setDate(NgayTN.getDate()-1)), 
        $lt: new Date(NgayTN)
      }
    }
    if(filters.DienThoai) {
      query.DienThoai = filters.DienThoai 
    }
    if(filters.TienNo) {
      query.TienNo = { $lte: filters.TienNo } 
    }
  
  }
  try {
    const carList = await carModel.aggregate([
      {
        $match: query
      },
      {
        $lookup: {
          from: 'hieuxes',
          localField: 'MaHieuXe',
          foreignField: 'MaHieuXe',
          as: 'HieuXe'
        }
      },
      {
        $unwind: '$HieuXe'
      },
      {
        $project: {
          _id:1,
          MaXe:1,
          TenKH:1,
          DiaChi:1,
          DienThoai:1,
          BienSo:1,
          Email:1,
          NgayNhan:1,
          TienNo:1,
          MaHieuXe:1,
          'HieuXe.TenHieuXe':1
        }
      }
    ]);
    const sortedList = carList.sort((a, b) => {
      const dateA = new Date(a.NgayNhan);
      const dateB = new Date(b.NgayNhan);
      return dateB - dateA;
    });
    
    return sortedList;
    
    // return carList;
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

