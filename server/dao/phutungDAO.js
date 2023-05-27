import phutungModel from '../models/phutungModel.js';

// Create a new PhuTung
const createPhuTung = async (phutungData) => {
  try {
    const newPhuTung = new phutungModel(phutungData);
    const savedPhuTung = await newPhuTung.save();
    return savedPhuTung;
  } catch (error) {
    throw error;
  }
};

// Get all PhuTung
const getAllPhuTung = async () => {
  try {
    const PhuTungs = await phutungModel.find();
   
    return PhuTungs;
  } catch (error) {
    throw error;
  }
};


// Update PhuTung data
const updatePhuTung = async (PhuTungData) => {
  try {
    const updatedPhuTung = await phutungModel.findOneAndUpdate({_id:PhuTungData._id},PhuTungData);
    return updatedPhuTung;
  } catch (error) {
    throw error;
  }
};

// Delete a PhuTung
const deletePhuTung = async (MaPhuTung) => {
  try {
    const result = await phutungModel.deleteOne({ MaPhuTung: MaPhuTung });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

export {
  createPhuTung,
  getAllPhuTung,
  updatePhuTung,
  deletePhuTung
};

