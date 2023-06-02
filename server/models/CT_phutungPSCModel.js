import mongoose from 'mongoose';

const ct_phutungPSCSchema = new mongoose.Schema({
    MaCT_PhuTung: {
        type: Number,
        unique: true,
    },
    MaCTPSC: {
        type: mongoose.Schema.Types.Number,
        ref: 'ct_phieusuachua'
    },
    MaPhuTung: {
        type: mongoose.Schema.Types.Number,
        ref: 'phutung'
    },
    SoLuong: {
        type: Number,
    },
    ThanhTien: {
        type: Number,
    }
});

ct_phutungPSCSchema.pre('save', async function (next) {
    if (!this.MaCT_PhuTung) {
        const ct_phutungPSCModel = mongoose.model('ct_phutungPSC', ct_phutungPSCSchema);
        const lastMaCT_PhuTung = await ct_phutungPSCModel.findOne({}, {}, { sort: { MaCT_PhuTung: -1 } }).exec();
        this.MaCT_PhuTung = lastMaCT_PhuTung ? lastMaCT_PhuTung.MaCT_PhuTung + 1 : 1;
    }
    next();
});

const ct_phutungPSC = mongoose.model('ct_phutungPSC', ct_phutungPSCSchema);

export default ct_phutungPSC;