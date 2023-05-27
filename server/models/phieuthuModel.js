import mongoose from 'mongoose';

const phieuthuSchema = new mongoose.Schema({
  MaPhieuThu: {
    type: Number,
    unique: true,
  },
  NgayThu: {
    type: Date,
  },
  SoTienThu: {
    type: Number
  },
  MaXe: {
    type: Number
  }
});


phieuthuSchema.pre('save', async function (next) {
  if (!this.MaPhieuThu) {
    const phieuthuModel = mongoose.model('phieuthu', phieuthuSchema);
    const lastphieuthu = await phieuthuModel.findOne({}, {}, { sort: { MaPhieuThu: -1 } }).exec();
    this.MaPhieuThu = lastphieuthu ? lastphieuthu.MaPhieuThu + 1 : 1;
  }
  next();
});

const phieuthu = mongoose.model('phieuthu', phieuthuSchema);

export default phieuthu;

