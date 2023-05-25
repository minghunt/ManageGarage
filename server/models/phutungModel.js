import mongoose from 'mongoose';

const phutungSchema = new mongoose.Schema({
  MaPhuTung: {
    type: Number,
    unique: true,
  },
  TenPhuTung: {
    type: String,
  },
  DonGia: {
    type: Number
  },
  SoLuongTon: {
    type: Number
  },
});


phutungSchema.pre('save', async function (next) {
  if (!this.MaPhuTung) {
    const phutungModel = mongoose.model('phutung', phutungSchema);
    const lastphutung = await phutungModel.findOne({}, {}, { sort: { MaPhuTung: -1 } }).exec();
    this.MaPhuTung = lastphutung ? lastphutung.MaPhuTung + 1 : 1;
  }
  next();
});

const phutung = mongoose.model('phutung', phutungSchema);

export default phutung;

