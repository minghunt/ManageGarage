import mongoose from 'mongoose';

const revenueReportSchema = new mongoose.Schema({
    MaPSC: {
        type: Number,
        unique: true,
    },
    MaXe: {
        type: String
    },
    NgaySC: {
        type: Date
    },
    TongTien: {
        type: Number
    }
});

revenueReportSchema.pre('save', async function (next) {
    if (!this.MaPSC) {
        const PscModel = mongoose.model('phieusuachua', revenueReportSchema);
        const lastPsc = await PscModel.findOne({}, {}, { sort: { MaPSC: -1 } }).exec();
        this.MaPSC = lastPsc ? lastPsc.MaPSC + 1 : 1;
    }
    next();
});

const psc = mongoose.model('phieusuachuas', revenueReportSchema);

export default psc;