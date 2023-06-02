import mongoose from 'mongoose';

const revenueReportSchema = new mongoose.Schema({
    MaDoanhThuThang: {
        type: Number,
        unique: true,
    },
    Thang: {
        type: Date
    },
    TongDoanhThu: {
        type: Number
    }
});
revenueReportSchema.pre('save', async function (next) {
    if (!this.MaDoanhThuThang) {
        const revenueReportModel = mongoose.model('doanhthuthang', revenueReportSchema);
        const lastrevenueReport= await revenueReportModel.findOne({}, {}, { sort: { MaDoanhThuThang: -1 } }).exec();
        this.MaDoanhThuThang = lastrevenueReport ? lastrevenueReport.MaDoanhThuThang + 1 : 1;
    }
    next();
});

const revenueReport = mongoose.model('doanhthuthang', revenueReportSchema);

export default revenueReport;