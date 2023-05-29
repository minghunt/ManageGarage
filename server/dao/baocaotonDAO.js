import baoCaoTonModel from '../models/baocaotonModel.js';

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