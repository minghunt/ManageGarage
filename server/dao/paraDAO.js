import paraModel from '../models/paraModel.js';


// Get all cars
const getPara = async () => {
  try {
    const paras = await paraModel.find();
   
    return paras;
  } catch (error) {
    throw error;
  }
};

// Update car data
const updatePara = async (paraData) => {
  try {
    const updatedpara = await paraModel.updateOne(paraData);
    return updatedpara;
  } catch (error) {
    throw error;
  }
};


export {
    getPara,
  updatePara,

};

