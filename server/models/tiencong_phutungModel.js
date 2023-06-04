import mongoose from 'mongoose';

const tiencongPhuTungSchema = new mongoose.Schema({
  MaTienCong: {
    type: mongoose.Schema.Types.Number,
    ref: 'tiencong',
  },
  MaPhuTung: {
    type: mongoose.Schema.Types.Number,
    ref: 'phutung',
  },
  SoLuong:{
      type:Number,
      required: true,
  }
});

const tiencong_phutung = mongoose.model('tiencong_phutung', tiencongPhuTungSchema);

export default tiencong_phutung;
