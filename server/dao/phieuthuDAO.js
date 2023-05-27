import phieuthuModel from '../models/phieuthuModel.js';
import carModel from '../models/carModel.js';

// Create a new PhieuThu
//TienNo chua xu ly
const createPhieuThu = async (phieuthuData) => {
  try {
    const newPhieuThu = new phieuthuModel(phieuthuData);
    const savedPhieuThu = await newPhieuThu.save();
    let xe = await carModel.findOne({MaXe:1})
    xe.TienNo-=phieuthuData.SoTienThu;
    const result = await carModel.findOneAndUpdate({_id:xe._id},xe)

    return savedPhieuThu;
  } catch (error) {
    throw error;
  }
};

export {
  createPhieuThu,

};

