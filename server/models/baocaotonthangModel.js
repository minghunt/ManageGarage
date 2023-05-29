import mongoose from 'mongoose';

const baocaotonthangSchema = new mongoose.Schema({
    MaBaoCaoTonThang: {
        type: Number,
        unique: true,
    },
    Thang: {
        type: Number,
        required: true
    },
    Nam: {
        type: Number,
        required: true
    },
    TonDau: {
        type: Number,
        required: true,
    },
    PhatSinh: {
        type: Number,
        required: true
    },
    TonCuoi: {
        type: Number,
        required: true
    }
});

baocaotonthangSchema.pre('save', async function (next) {
    if (!this.MaBaoCaoTonThang) {
        const BCTTModel = mongoose.model('baocaotonthang', baocaotonthangSchema);
        const lastBCTT = await BCTTModel.findOne({}, {}, { sort: { MaBaoCaoTonThang: -1 } }).exec();
        this.MaBaoCaoTonThang = lastBCTT ? lastBCTT.MaBaoCaoTonThang + 1 : 1;
    }
    next();
});

const BCTT = mongoose.model('baocaotonthangs', baocaotonthangSchema);

export default BCTT;