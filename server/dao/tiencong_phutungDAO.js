import tiencong_phutungModel from '../models/tiencong_phutungModel.js';

const createTC_PT = async (TC_PTData) => {
    try { 
        const newTC_PT = await tiencong_phutungModel(TC_PTData);
        const savedTC_PT = await newTC_PT.save();
        return savedTC_PT
      } catch (error) {
        throw error;
      }
};

async function getAllTc_Pt(req, res) {
  try {
    const tc_pt = await tiencong_phutungModel.find();
    return tc_pt;
  } catch (error) {
    throw error;
  }
}
export {
    createTC_PT,
    getAllTc_Pt,
};

