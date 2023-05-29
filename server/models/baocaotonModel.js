import mongoose from 'mongoose';

const baocaotonSchema = new mongoose.Schema({
    MaBaoCaoTon: {
        type: Number,
        unique: true,
    },
    MaPhuTung: {
        type: Number,
        required: true,
    },
    MaBaoCaoTonThang: {
        type: Number,
        required: true
    }
});

baocaotonSchema.pre('save', async function (next) {
    if (!this.MaBaoCaoTon) {
        const BCTModel = mongoose.model('baocaoton', baocaotonSchema);
        const lastBCT = await BCTModel.findOne({}, {}, { sort: { MaBaoCaoTon: -1 } }).exec();
        this.MaBaoCaoTon = lastBCT ? lastBCT.MaBaoCaoTon + 1 : 1;
    }
    next();
});

const BCT = mongoose.model('baocaotons', baocaotonSchema);

export default BCT;