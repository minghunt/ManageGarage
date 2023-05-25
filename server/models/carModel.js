import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  MaXe: {
    type: Number,
    unique: true,
  },
  TenKH:{
    type: String,
    require: true,
  },
  DiaChi: {
    type: String,
  },
  DienThoai: {
    type: String,
    require: true,
  },
  BienSo: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
  },
  MaHieuXe: {
    type: Number,
  },
  NgayNhan: {
    type: Date,
  },
  TienNo: {
    type: Number,
    default: 0
  },
});


carSchema.pre('save', async function (next) {
  if (!this.MaXe) {
    const XeModel = mongoose.model('xes', carSchema);
    const lastCar = await XeModel.findOne({}, {}, { sort: { MaXe: -1 } }).exec();
    this.MaXe = lastCar ? lastCar.MaXe + 1 : 1;
  }
  next();
});

const xe = mongoose.model('xes', carSchema);

export default xe;

