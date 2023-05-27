import mongoose from 'mongoose';

const phieunhapSchema = new mongoose.Schema({
  MaNhapPhuTung: {
    type: Number,
    unique: true,
  },
  NgayNhap: {
    type: Date,
  },
  TongTienNhap: {
    type: Number
  },
});


phieunhapSchema.pre('save', async function (next) {
  if (!this.MaNhapPhuTung) {
    const phieunhapModel = mongoose.model('nhapphutung', phieunhapSchema);
    const lastphieunhap = await phieunhapModel.findOne({}, {}, { sort: { MaNhapPhuTung: -1 } }).exec();
    this.MaNhapPhuTung = lastphieunhap ? lastphieunhap.MaNhapPhuTung + 1 : 1;
  }
  next();
});

const phieunhap = mongoose.model('nhapphutung', phieunhapSchema);

export default phieunhap;

