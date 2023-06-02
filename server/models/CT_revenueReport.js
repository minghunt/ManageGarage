import mongoose from 'mongoose';

const CT_revenueReportSchema = new mongoose.Schema({
    MaCTDoanhThuThang: {
        type: Number,
        unique: true,
    },
    MaDoanhThuThang: {
        type: Number,
    },
    MaHieuXe: {
        type: Number,
    },
    SoLuotSua: {
        type: Number
    },
    ThanhTien: {
        type: Number
    }
});

CT_revenueReportSchema.pre('save', async function (next) {
    if (!this.MaCTDoanhThuThang) {
        const CT_revenueReportModel = mongoose.model('ct_doanhthuthang', CT_revenueReportSchema);
        const lastrevenueReport= await CT_revenueReportModel.findOne({}, {}, { sort: { MaCTDoanhThuThang: -1 } }).exec();
        this.MaCTDoanhThuThang = lastrevenueReport ? lastrevenueReport.MaCTDoanhThuThang + 1 : 1;
    }
    next();
});

const CT_revenueReport = mongoose.model('ct_doanhthuthang', CT_revenueReportSchema);

export default CT_revenueReport;