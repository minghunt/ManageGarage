import cron from "node-cron";
import baoCaoTonModel from "../models/baocaotonModel.js";
import baocaotonthangModel from "../models/baocaotonthangModel.js";
import ct_phieusuachuaModel from "../models/CT_phieusuachuaModel.js";
import CT_phieunhapModel from "../models/CT_phieunhapModel.js";
import phutungModel from "../models/phutungModel.js";
import CT_phutungPSCModel from "../models/CT_phutungPSCModel.js"
// Xử lý logic và lưu dữ liệu sau mỗi tháng
cron.schedule("0 0 1 * *", async () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Lấy tháng từ 0 đến 11, cộng thêm 1 để chuyển sang định dạng từ 1 đến 12
  var lastMonth;
  if (currentMonth - 1 === 0) {
    lastMonth = 12;
  } else {
    lastMonth = currentMonth;
  }
  const currentYear = currentDate.getFullYear();

  const ct_phieunhap = await CT_phieunhapModel.aggregate([
    {
      $lookup: {
        from: "phutungs",
        localField: "MaPhuTung",
        foreignField: "MaPhuTung",
        as: "PhuTung",
      },
    },
    {
      $lookup: {
        from: "nhapphutungs",
        localField: "MaNhapPhuTung",
        foreignField: "MaNhapPhuTung",
        as: "NhapPhuTung",
      },
    },
    {
      // $unwind: "$PhuTung"
      $unwind: {
        path: "$PhuTung",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      // $unwind: "$NhapPhuTung"
      $unwind: {
        path: "$NhapPhuTung",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        // tự động cập nhật
        $expr: {
          $and: [
            { $eq: [{ $year: "PhieuSuaChua.NgaySC" }, currentYear] },
            { $eq: [{ $month: "PhieuSuaChua.NgaySC" }, lastMonth] }
          ]
        }
        // cập nhật t4, t5
        // "NhapPhuTung.NgayNhap": {
        //   $gte: new Date("2023-05-01"),
        //   $lt: new Date("2023-06-01"),
        // },
      },
    },
    {
      $group: {
        _id: "$PhuTung.MaPhuTung",
        SLNhapTrongThang: { $sum: "$SoLuongNhap" },
        TenPhuTung: { $first: "$PhuTung.TenPhuTung" },
        SoLuongTon: { $first: "$PhuTung.SoLuongTon" },
        NgayNhap: { $first: "$NhapPhuTung.NgayNhap" },
      },
    },
    {
      $project: {
        _id: 0,
        MaPhuTung: "$_id",
        TenPhuTung: 1,
        SoLuongTon: 1,
        SLNhapTrongThang: 1,
        NgayNhap: 1,
      },
    },
  ]);

  // tìm các phụ tùng mặc dù không không được phát sinh
  const phutung = await phutungModel.find({});
  for (const item of phutung) {
    const exist = ct_phieunhap.find(
      (item1) => item1.MaPhuTung === item.MaPhuTung
    );
    if (exist) {
      continue;
    } else {
      const data = {
        MaPhuTung: item.MaPhuTung,
        TenPhuTung: item.TenPhuTung,
        SoLuongTon: item.SoLuongTon,
        SLNhapTrongThang: 0,
        NgayNhap: [],
      };
      ct_phieunhap.push(data);
    }
  }
  console.log(ct_phieunhap);
  const ct_phieusuachua = await ct_phieusuachuaModel.aggregate([
    {
      $lookup: {
        from: "ct_phutungpscs",
        localField: "MaCTPSC",
        foreignField: "MaCTPSC",
        as: "PhuTungPSC",
      },
    },
    {
      $lookup: {
        from: "phieusuachuas",
        localField: "MaPSC",
        foreignField: "MaPSC",
        as: "PhieuSuaChua",
      },
    },
    {
      $unwind: "$PhuTungPSC",
    },
    {
      $unwind: "$PhieuSuaChua",
    },
    {
      $match: {
        // tự động cập nhật
        $expr: {
          $and: [
            { $eq: [{ $year: "PhieuSuaChua.NgaySC" }, currentYear] },
            { $eq: [{ $month: "PhieuSuaChua.NgaySC" }, lastMonth] }
          ]
        }
        // cập nhật t4, t5
        // "PhieuSuaChua.NgaySC": {
        //   $gte: new Date("2023-05-01"),
        //   $lt: new Date("2023-06-01"),
        // },
      },
    },
    {
      $group: {
        _id: "$PhuTungPSC.MaPhuTung",
        SLSuaChua: { $sum: "$PhuTungPSC.SoLuong" },
        NgaySC: { $first: "$PhieuSuaChua.NgaySC" },
      },
    },
    {
      $project: {
        _id: 0,
        MaPhuTung: "$_id",
        SLSuaChua: 1,
        NgaySC: 1,
      },
    },
  ]);
  console.log(ct_phieusuachua);
  // lưu dữ liệu báo cáo tồn
  for (const item of ct_phieunhap) {
    const phutung = ct_phieusuachua.find(
      (item1) => item1.MaPhuTung === item.MaPhuTung
    );
    let data;
    if (phutung) {
      data = {
        Thang: currentMonth,
        Nam: currentYear,
        TonDau: item.SoLuongTon,
        PhatSinh: item.SLNhapTrongThang,
        TonCuoi: item.SoLuongTon + item.SLNhapTrongThang - phutung.SLSuaChua,
      };
    } else {
      data = {
        Thang: currentMonth,
        Nam: currentYear,
        TonDau: item.SoLuongTon,
        PhatSinh: item.SLNhapTrongThang,
        TonCuoi: item.SoLuongTon + item.SLNhapTrongThang,
      };
    };
    console.log(data);
    const res = await phutungModel.updateOne({ MaPhuTung: item.MaPhuTung }, { SoLuongTon: data.TonCuoi });
    const baocaotonthang = new baocaotonthangModel(data);
    const savedReportMonth = await baocaotonthang.save();
    const databaocaoton = {
      MaPhuTung: item.MaPhuTung,
      MaBaoCaoTonThang: savedReportMonth.MaBaoCaoTonThang
    }
    const baocaoton = new baoCaoTonModel(databaocaoton)
    const savedReport = await baocaoton.save()
  }

  
});
// Create a new car
const createReport = async (Data) => {
  try {
    const newReport = new baoCaoTonModel(Data);
    const savedCar = await newReport.save();
    return savedCar;
  } catch (error) {
    throw error;
  }
};
// get
const getReportByMonth = async (month, year) => {
  try {
    const baocao = await baoCaoTonModel.aggregate([
      {
        $lookup: {
          from: "baocaotonthangs",
          localField: "MaBaoCaoTonThang",
          foreignField: "MaBaoCaoTonThang",
          as: "BaoCaoTonThang",
        },
      },
      {
        $lookup: {
          from: "phutungs",
          localField: "MaPhuTung",
          foreignField: "MaPhuTung",
          as: "PhuTung",
        },
      },
      {
        $unwind: "$BaoCaoTonThang",
      },
      {
        $unwind: "$PhuTung",
      },
      {
        $match: {
          $and: [
            { "BaoCaoTonThang.Thang": { $eq: month } },
            { "BaoCaoTonThang.Nam": { $eq: year } },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          "PhuTung.TenPhuTung": 1,
          "BaoCaoTonThang.Thang": 1,
          "BaoCaoTonThang.Nam": 1,
          "BaoCaoTonThang.TonDau": 1,
          "BaoCaoTonThang.PhatSinh": 1,
          "BaoCaoTonThang.TonCuoi": 1,
        },
      },
    ]);
    console.log(baocao);
    return baocao;
  } catch (error) {
    throw error;
  }
};

export { createReport, getReportByMonth };
