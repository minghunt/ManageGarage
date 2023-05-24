import mongoose from 'mongoose';

const paraSchema = new mongoose.Schema({
  SoXeSuaChuaToiDa: {
    type: Number,
  },
  TiLeTinhDonGiaBan: {
    type: Number,
  },
  KiemTraTienThu: {
    type: Boolean
  }
});


paraSchema.pre('save', async function (next) {
  
  
});

const para = mongoose.model('thamso', paraSchema);

export default para;

