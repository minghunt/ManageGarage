import mongoose from 'mongoose';

const ct_phieusuachuaSchema = new mongoose.Schema({
    MaCTPSC: {
        type: Number,
        unique: true,
    },
    MaPSC: {
        type: mongoose.Schema.Types.Number,
        ref: 'phieusuachua'
    },
    MaTienCong: {
        type: mongoose.Schema.Types.Number,
        ref: 'tiencong'
    },
    MoTa: {
        type: String,
    },
    TienCong: {
        type: Number
    }
});

ct_phieusuachuaSchema.pre('save', async function (next) {
    if (!this.MaCTPSC) {
        const ctPSCModel = mongoose.model('ct_phieusuachua', ct_phieusuachuaSchema);
        const lastMaCTPSC = await ctPSCModel.findOne({}, {}, { sort: { MaCTPSC: -1 } }).exec();
        this.MaCTPSC = lastMaCTPSC ? lastMaCTPSC.MaCTPSC + 1 : 1;
    }
    next();
});

const ct_phieusuachua = mongoose.model('ct_phieusuachua', ct_phieusuachuaSchema);

export default ct_phieusuachua;