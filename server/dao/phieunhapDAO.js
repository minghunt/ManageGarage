import phieunhapModel from '../models/phieunhapModel.js';
import ct_phieunhapModel from '../models/CT_phieunhapModel.js';
import phutungModel from '../models/phutungModel.js'
import paraModel from '../models/paraModel.js'
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
    PhieuNhapData.listParts.map((item,index)=>{
      let _ctnhappt={
        MaNhapPhuTung:savedPhieuNhap.MaNhapPhuTung,
        MaPhuTung:item.MaPhuTung,
        SoLuongNhap:item.quantity,
        DonGiaNhap:item.price
      }
      const newctPhieuNhap = new ct_phieunhapModel(_ctnhappt);
      setTimeout(async () => {
        newctPhieuNhap.save();
      }, index*300);
    })

    //sua phu tung
    let para=await paraModel.findOne({});
    let phutunglist=await phutungModel.find()
    PhieuNhapData.listParts.map((item,key)=>{
      let _phutung=phutunglist.filter(i=>i.MaPhuTung===item.MaPhuTung)
      _phutung[0].DonGia=item.price*para.TiLeTinhDonGiaBan;
      _phutung[0].SoLuongTon= _phutung[0].SoLuongTon+Number(item.quantity);
      setTimeout(async() => {
        let resuls=await phutungModel.findOneAndUpdate({MaPhuTung:_phutung[0].MaPhuTung},_phutung[0])
      }, key*100);
      
    })

    return savedPhieuNhap;
  } catch (error) {
    throw error;
  }
};

export {
  createPhieuNhap,

};

