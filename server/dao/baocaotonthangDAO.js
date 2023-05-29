import baocaotonthangModel from '../models/baocaotonthangModel.js';

// Create a new car
const createReport = async (Data) => {
  try {
      const newReport = new baocaotonthangModel(Data);
      const savedCar = await newReport.save();
      return savedCar;
  } 
  catch (error) {
    throw error;
  }
};

export{
  createReport
}