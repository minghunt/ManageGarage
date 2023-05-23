import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  MaHieuXe: {
    type: Number,
    unique: true,
  },
  TenHieuXe: {
    type: String,
  }
});


carSchema.pre('save', async function (next) {
  if (!this.MaHieuXe) {
    const CarModel = mongoose.model('hieuxe', carSchema);
    const lastCar = await CarModel.findOne({}, {}, { sort: { MaHieuXe: -1 } }).exec();
    this.MaHieuXe = lastCar ? lastCar.MaHieuXe + 1 : 1;
  }
  next();
});

const hieuxe = mongoose.model('hieuxe', carSchema);

export default hieuxe;

