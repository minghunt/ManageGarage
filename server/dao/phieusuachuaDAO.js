import phieusuachuaModel from '../models/phieusuachuaModel.js';
import ct_phieusuachuaModel from '../models/CT_phieusuachuaModel.js';
import ct_phutungPSCModel from '../models/CT_phutungPSCModel.js';
import tiencong_phutungModel from '../models/tiencong_phutungModel.js';
import carModal from '../models/carModel.js'
import phutungModal from '../models/phutungModel.js'
const createPSC = async (pscData) => {
    try {
        // Tạo phiếu sửa chữa
        let _phieusuachua = {
            MaXe: pscData.MaXe,
            NgaySC: pscData.NgaySC,
            TongTien: pscData.TongTien
        }
        const newPsc = new phieusuachuaModel(_phieusuachua);
        const savedPsc = await newPsc.save();
        //Cap nhat tien no
        let r=await carModal.findOneAndUpdate({MaXe:pscData.MaXe},{ $inc: {TienNo:_phieusuachua.TongTien}})
        console.log(pscData)
        //Cap nhat so luong
        pscData.dsPhuTung.map(async (item)=>{
            let quantity=-Number(item.quantity)
            await phutungModal.findOneAndUpdate({MaPhuTung:item.MaPhuTung},{ $inc: {SoLuongTon:quantity}})
        })
        // Tạo ct_phieusuachua tương ứng
        for (const noidung of pscData.dsNoiDung) {
            let _ctPsc =  new ct_phieusuachuaModel({
                MaPSC: savedPsc.MaPSC,
                MaTienCong: noidung.MaTienCong,
            });
            const savedCtPsc = await _ctPsc.save();

            // Tạo ct_phutungPSC theo ct_phieusuachua (tiencong)
            for (const phutung of pscData.dsPhuTung) {
                const tiencong_phutung = await tiencong_phutungModel.findOne({
                    MaTienCong: savedCtPsc.MaTienCong,
                    MaPhuTung: phutung.MaPhuTung
                })
                if(tiencong_phutung) {
                    let _ctPhuTungPSC = ct_phutungPSCModel({
                        MaCTPSC: savedCtPsc.MaCTPSC,
                        MaPhuTung: phutung.MaPhuTung,
                        SoLuong: phutung.quantity,
                        ThanhTien: phutung.total,
                    })
                    await _ctPhuTungPSC.save();
                }
            }
        }

        return savedPsc;
    } catch (error) {
        throw error;
    }
};

export {
    createPSC,
};

