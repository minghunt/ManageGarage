import phieunhapModel from '../models/phieunhapModel.js';
import ct_phieunhapModel from '../models/CT_phieunhapModel.js';
import phutungModel from '../models/phutungModel.js'
// Create a new PhieuNhap

const createPhieuNhap = async (PhieuNhapData) => {
  try {
    //tao phieu nhap
    let _phieunhap ={
      NgayNhap:PhieuNhapData.NgayNhap,
      TongTienNhap:PhieuNhapData.TongTienNhap
    }
    const newPhieuNhap = new phieunhapModel(_phieunhap);
    const savedPhieuNhap = await newPhieuNhap.save();
    //them ct_phieunhap
    PhieuNhapData.listParts.map(async (item)=>{
      let _ctnhappt={
        MaNhapPhuTung:savedPhieuNhap.MaNhapPhuTung,
        MaPhuTung:item.MaPhuTung,
        SoLuongNhap:item.quantity,
        DonGiaNhap:item.price
      }
      const newctPhieuNhap = new ct_phieunhapModel(_ctnhappt);
      setTimeout(async () => {
      const s= await newctPhieuNhap.save();
        
      }, 500);
    })
    //sua phu tung
    let phutunglist=await phutungModel.find()
    PhieuNhapData.listParts.map((item)=>{
      let _phutung=phutunglist.filter(i=>i.MaPhuTung===item.MaPhuTung)
      
      console.log(_phutung)
      // const newctPhieuNhap = new ct_phieunhapModel(_ctnhappt);
      // newctPhieuNhap.save();
    })

   

    return savedPhieuNhap;
  } catch (error) {
    throw error;
  }
};

export {
  createPhieuNhap,

};

