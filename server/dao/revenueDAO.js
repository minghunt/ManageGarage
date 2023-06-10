import revenueReport from '../models/revenueReport.js';
import CT_revenueReport from '../models/CT_revenueReport.js';

import carBrandModel from '../models/carBrandModel.js';
import { format } from 'date-fns';
import viLocale from 'date-fns/locale/vi/index.js';

function formatDateToVN(date) {
    let _date = new Date(date)
    return format(_date, 'MM-yyyy', { locale: viLocale });
}
// Create a new PhieuThu
//TienNo chua xu ly
const getrevenueReport = async (revenueReportData) => {
    try {
        const startDate = revenueReportData.Thang + '-01'
        const endDate = revenueReportData.Thang + '-31'
        console.log('ngafy',startDate,endDate)
        const savedrevenueReport = await revenueReport.find()
        let check = true;
        let RevenueReport = {};
        savedrevenueReport.map((item) => {
            if (formatDateToVN(item.Thang) === formatDateToVN(revenueReportData.Thang)) {
                check = false
                RevenueReport = item;
                return
            }
        })
        if (check||savedrevenueReport.length===0) {
            let CT_DoanhThuThang = await carBrandModel.aggregate([
                {
                    $lookup: {
                        from: "xes",
                        localField: "MaHieuXe",
                        foreignField: "MaHieuXe",
                        as: "xe"
                    }
                },
                {
                    $unwind: "$xe"
                },
                {
                    $lookup: {
                        from: "phieusuachuas",
                        localField: "xe.MaXe",
                        foreignField: "MaXe",
                        as: "phieuSuaChua"
                    }
                },
                {
                    $lookup: {
                        from: "phieuthus",
                        localField: "xe.MaXe",
                        foreignField: "MaXe",
                        as: "phieuThu"
                    }
                },
                {
                    $unwind:"$phieuSuaChua",
                    $unwind:"$phieuThu"
                }
                ,
                {
                    $match: {
                        $and: [
                            { "phieuSuaChua.NgaySC": { $gte: new Date(startDate), $lte: new Date(endDate) } },
                            { "phieuThu.NgayThu": { $gte: new Date(startDate), $lte: new Date(endDate) } },
                        ]
                    }
                },
                {
                    $group: {
                        _id: "$MaHieuXe",
                        TenHieuXe: { $first: "$TenHieuXe" },
                        SoLuotSua: { $sum: 1 },
                        ThanhTien: { $sum: { $sum: "$phieuThu.SoTienThu" } }
                    }
                }
            ])
            console.log(CT_DoanhThuThang)
            let SumDoanhThu = 0;
            CT_DoanhThuThang.map((item) => {
                SumDoanhThu += item.ThanhTien;
            })
            let RPdata = {
                TongDoanhThu: SumDoanhThu,
                Thang: revenueReportData.Thang,
            }

            const newReport = new revenueReport(RPdata);

            RevenueReport = await newReport.save()
            let resCT_DoanhThuThang=[]
            CT_DoanhThuThang.map((item, key) => {
                let ct_doanhthuthang = {
                    MaDoanhThuThang: RevenueReport.MaDoanhThuThang,
                    HieuXe:{TenHieuXe: item.TenHieuXe},
                    MaHieuXe:item._id,
                    SoLuotSua: item.SoLuotSua,
                    ThanhTien: item.ThanhTien
                }
                resCT_DoanhThuThang.push(ct_doanhthuthang)
                const ct_revenueReport = new CT_revenueReport(ct_doanhthuthang)
                setTimeout(() => {
                    ct_revenueReport.save()

                }, key * 1500);
            })
            let res_RevenueReport={
                RevenueReport,
                resCT_DoanhThuThang
            }
            console.log(res_RevenueReport)
            return res_RevenueReport
        } else {
            let resCT_DoanhThuThang=await CT_revenueReport.aggregate([
                {$match:{MaDoanhThuThang:RevenueReport.MaDoanhThuThang}},
                {
                    $lookup: {
                      from: 'hieuxes',
                      localField: 'MaHieuXe',
                      foreignField: 'MaHieuXe',
                      as: 'HieuXe'
                    }
                  },
                  {
                    $unwind: '$HieuXe'
                  },
                  {
                    $project: {
                      SoLuotSua:1,
                      ThanhTien:1,
                      'HieuXe.TenHieuXe':1
                    }
                  }
            ]
            )
            let res_RevenueReport={
                RevenueReport,
                resCT_DoanhThuThang
            }
            console.log(res_RevenueReport)
            return res_RevenueReport;
        }
    } catch (error) {
        throw error;
    }
};

export {
    getrevenueReport,
};

