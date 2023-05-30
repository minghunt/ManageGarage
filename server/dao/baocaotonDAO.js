import cron from 'node-cron';
import baoCaoTonModel from '../models/baocaotonModel.js';
import baocaotonthangModel from '../models/baocaotonthangModel.js';
import phutungModel from '../models/phutungModel.js';
import CT_phieunhapModel from '../models/CT_phieunhapModel.js';


// Xử lý logic và lưu dữ liệu sau mỗi phút
cron.schedule('* * * * *', async() => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;// Lấy tháng từ 0 đến 11, cộng thêm 1 để chuyển sang định dạng từ 1 đến 12
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
  ct_phieunhap.map((item)=>{
    const data = {
      Thang: currentMonth,
      Nam: currentYear,
      TonDau:item.SoLuongTon,
      TonCuoi:(item.SoLuongTon+item.SoLuongTon),
      PhatSinh:item.SLNhapTrongThang,
    };
  })
  // Lưu dữ liệu vào cơ sở dữ liệu
  // const newBCT = new baocaotonthangModel(data);
  // newBCT.save()

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