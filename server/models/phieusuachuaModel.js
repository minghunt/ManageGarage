import mongoose from 'mongoose';

const phieusuachuaSchema = new mongoose.Schema({
    MaPSC: {
        type: Number,
        unique: true,
    },
    MaXe:{
        type:Number
    }
    ,
    BienSo: {
        type: String
    },
    NgaySC: {
        type: Date
    },
    TongTien: {
        type: Number
    }
});

phieusuachuaSchema.pre('save', async function (next) {
    if (!this.MaPSC) {
        const PscModel = mongoose.model('phieusuachua', phieusuachuaSchema);
        const lastPsc = await PscModel.findOne({}, {}, { sort: { MaPSC: -1 } }).exec();
        this.MaPSC = lastPsc ? lastPsc.MaPSC + 1 : 1;
    }
    next();
});

const psc = mongoose.model('phieusuachua', phieusuachuaSchema);

export default psc;