import mongoose from 'mongoose';

const CT_phieunhapSchema = new mongoose.Schema({
  MaCTNhapPhuTung: {
    type: Number,
    
  },
  MaPhuTung: {
    type: Number,
  },
  MaNhapPhuTung: {
    type: Number
  },
  SoLuongNhap:{
    type:Number
  },
  
  DonGiaNhap:{
    type:Number
  }
});



CT_phieunhapSchema.pre('save', async function (next) {
  if (!this.MaCTNhapPhuTung) {
    const CT_phieunhapModel = mongoose.model('ct_nhapphutung', CT_phieunhapSchema);
    const lastphieunhap = await CT_phieunhapModel.findOne({}, {}, { sort: { MaCTNhapPhuTung: -1 } }).exec();
    this.MaCTNhapPhuTung = lastphieunhap ? lastphieunhap.MaCTNhapPhuTung + 1 : 1;
  }
  next();
});


const ct_phieunhap = mongoose.model('ct_nhapphutung', CT_phieunhapSchema);

export default ct_phieunhap;

