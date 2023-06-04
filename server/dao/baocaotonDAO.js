import cron from 'node-cron';
import baoCaoTonModel from '../models/baocaotonModel.js';
import baocaotonthangModel from '../models/baocaotonthangModel.js';
import ct_phieusuachuaModel from '../models/CT_phieusuachuaModel.js';
import CT_phieunhapModel from '../models/CT_phieunhapModel.js';


// Xử lý logic và lưu dữ liệu sau mỗi tháng
cron.schedule('0 0 1 * *', async() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;// Lấy tháng từ 0 đến 11, cộng thêm 1 để chuyển sang định dạng từ 1 đến 12
  let lastMonth
  if ( (currentMonth -1) === 0)
  {
    lastMonth = 12;
  }
  else{
    lastMonth = currentMonth;
  }
  const currentYear = currentDate.getFullYear();

  const ct_phieunhap = await CT_phieunhapModel.aggregate([
      {
        $lookup: {
          from: "phutungs",
          localField: "MaPhuTung",
          foreignField: "MaPhuTung",
          as: "PhuTung"
        }
      },
      {
        $lookup: {
          from: "nhapphutungs",
          localField: "MaNhapPhuTung",
          foreignField: "MaNhapPhuTung",
          as: "NhapPhuTung"
        }
      },
      {
        $unwind: "$PhuTung"
      },
      {
        $unwind: "$NhapPhuTung"
      },
      {
        $group: { 
          _id: '$PhuTung.MaPhuTung', SLNhapTrongThang: { $sum: "$SoLuongNhap" }, TenPhuTung: { $first: '$PhuTung.TenPhuTung' }, SoLuongTon: {$first:'$PhuTung.SoLuongTon'}, NgayNhap: {$first:'$NhapPhuTung.NgayNhap'}
        } 
      },
      {
        $project: {
          _id: 0,
          MaPhuTung:"$_id",
          TenPhuTung: 1,
          SoLuongTon:1,
          SLNhapTrongThang:1,
          NgayNhap:1,
        }
       }
  ]);
  console.log(ct_phieunhap);
  const ct_phieusuachua = await ct_phieusuachuaModel.aggregate([
    {
      $lookup: {
        from: "tiencong_phutungs",
        localField: "MaTienCong",
        foreignField: "MaTienCong",
        as: "TienCong"
      }
    },
    {
      $lookup: {
        from: "phieusuachuas",
        localField: "MaPSC",
        foreignField: "MaPSC",
        as: "PhieuSuaChua"
      }
    },
    {
      $unwind: "$TienCong"
    },
    {
      $unwind: "$PhieuSuaChua"
    },
    {
      $match: {
        $expr: {
          $and: [
            { $eq: [{ $year: "PhieuSuaChua.NgaySC" }, currentYear] },
            { $eq: [{ $month: "PhieuSuaChua.NgaySC" }, lastMonth] }
          ]
        }
      }
    },
    {
      $group: { 
        _id: '$TienCong.MaPhuTung', SLSuaChua: { $sum: "$TienCong.SoLuong" }, NgaySC: { $first: '$PhieuSuaChua.NgaySC' }
      } 
    },
    {
      $project: {
        _id: 0,
        MaPhuTung:"$_id",
        SLSuaChua:1,
        NgaySC:1,
      }
     }
  ]);
  console.log(ct_phieusuachua)
  for (const item of ct_phieunhap) 
  {
    const phutung = ct_phieusuachua.find((item1)=>item1.MaPhuTung=== item.MaPhuTung)
    const data = {
      Thang: currentMonth,
      Nam: currentYear,
      TonDau:item.SoLuongTon,
      PhatSinh:item.SLNhapTrongThang,
      TonCuoi:(item.SoLuongTon+item.SLNhapTrongThang-phutung.SLSuaChua)
    };
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
    } 
    catch (error) {
      throw error;
    }
  };
// get
const getReportByMonth = async (month, year ) => {
    try {

        const baocao = await baoCaoTonModel.aggregate([
            {
                $lookup: {
                  from: "baocaotonthangs",
                  localField: "MaBaoCaoTonThang",
                  foreignField: "MaBaoCaoTonThang",
                  as: "BaoCaoTonThang"
                }
              },
              {
                $lookup: {
                  from: "phutungs",
                  localField: "MaPhuTung",
                  foreignField: "MaPhuTung",
                  as: "PhuTung"
                }
              },
              {
                $unwind: "$BaoCaoTonThang"
              },
              {
                $unwind: "$PhuTung"
              },
              {
                $match:{
                   $and: [ 
                    { "BaoCaoTonThang.Thang": { $eq: month } }, 
                    { "BaoCaoTonThang.Nam": { $eq: year }} 
                  ]}
              },
              {
                $project: {
                  _id: 1,
                  'PhuTung.TenPhuTung':1,
                  'BaoCaoTonThang.Thang':1,
                  'BaoCaoTonThang.Nam':1,
                  'BaoCaoTonThang.TonDau':1,
                  'BaoCaoTonThang.PhatSinh':1,
                  'BaoCaoTonThang.TonCuoi':1,

                }
              }
          ]);
        console.log(baocao)
        return baocao;
    } catch (error) {
      throw error;
    }
  };

  export {
    createReport,
    getReportByMonth
  };