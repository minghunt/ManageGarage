import mongoose from 'mongoose';

const tiencongSchema = new mongoose.Schema({
  MaTienCong: {
    type: Number,
    unique: true,
  },
  MoTa: {
    type: String,
  },
  TienCong: {
    type: Number
  }
});


tiencongSchema.pre('save', async function (next) {
  if (!this.MaTienCong) {
    const tiencongModel = mongoose.model('tiencong', tiencongSchema);
    const lasttiencong = await tiencongModel.findOne({}, {}, { sort: { MaTienCong: -1 } }).exec();
    this.MaTienCong = lasttiencong ? lasttiencong.MaTienCong + 1 : 1;
  }
  next();
});

const tiencong = mongoose.model('tiencong', tiencongSchema);

export default tiencong;

