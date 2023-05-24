import mongoose from 'mongoose';

const carBrandSchema = new mongoose.Schema({
  MaHieuXe: {
    type: Number,
    unique: true,
  },
  TenHieuXe: {
    type: String,
  }
});


carBrandSchema.pre('save', async function (next) {
  if (!this.MaHieuXe) {
    const CarBrandModel = mongoose.model('hieuxe', carBrandSchema);
    const lastCarBrand = await CarBrandModel.findOne({}, {}, { sort: { MaHieuXe: -1 } }).exec();
    this.MaHieuXe = lastCarBrand ? lastCarBrand.MaHieuXe + 1 : 1;
  }
  next();
});

const hieuxe = mongoose.model('hieuxes', carBrandSchema);

export default hieuxe;

