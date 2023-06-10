import tiencongModel from '../models/tiencongModel.js';

// Create a new TienCong
const createTienCong = async (tiencongData) => {
  try {
    const newTienCong = new tiencongModel(tiencongData);
    const savedTienCong = await newTienCong.save();
    return savedTienCong;
  } catch (error) {
    throw error;
  }
};

// Get all TienCong
const getAllTienCong = async () => {
  try {
    const TienCongs = await tiencongModel.find();
    return TienCongs;
  } catch (error) {
    throw error;
  }
};


// Update TienCong data
const updateTienCong = async (TienCongData) => {
  try {
    const updatedTienCong = await tiencongModel.findOneAndUpdate({_id:TienCongData._id},TienCongData);
    return updatedTienCong;
  } catch (error) {
    throw error;
  }
};

// Delete a TienCong
const deleteTienCong = async (MaTienCong) => {
  try {
    const result = await tiencongModel.deleteOne({ MaTienCong: MaTienCong });
    return result.deletedCount;
  } catch (error) {
    throw error;
  }
};

export {
  createTienCong,
  getAllTienCong,
  updateTienCong,
  deleteTienCong
};

