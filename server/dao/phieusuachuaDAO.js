import phieusuachuaModel from '../models/phieusuachuaModel.js';
import ct_phieusuachuaModel from '../models/CT_phieusuachuaModel.js';
import ct_phutungPSCModel from '../models/CT_phutungPSCModel.js';
import tiencong_phutungModel from '../models/tiencong_phutungModel.js';

const createPSC = async (pscData) => {
    try {
        // Tạo phiếu sửa chữa
        let _phieusuachua = {
            BienSo: pscData.BienSo,
            NgaySC: pscData.NgaySC,
            TongTien: pscData.TongTien
        }
        console.log("DAO. _phieusuachua: ", _phieusuachua);
        const newPsc = new phieusuachuaModel(_phieusuachua);
        const savedPsc = await newPsc.save();

        // Tạo ct_phieusuachua tương ứng
        for (const noidung of pscData.dsNoiDung) {
            let _ctPsc =  new ct_phieusuachuaModel({
                MaPSC: savedPsc.MaPSC,
                MaTienCong: noidung.MaTienCong,
            });
            console.log("DAO. _ctPsc: ", _ctPsc);
            const savedCtPsc = await _ctPsc.save();

            // Tạo ct_phutungPSC theo ct_phieusuachua (tiencong)
            for (const phutung of pscData.dsPhuTung) {
                const tiencong_phutung = await tiencong_phutungModel.findOne({
                    MaTienCong: savedCtPsc.MaTienCong,
                    MaPhuTung: phutung.MaPhuTung
                })
                console.log("tiencong_phutung :", tiencong_phutung);
                if(tiencong_phutung) {
                    let _ctPhuTungPSC = ct_phutungPSCModel({
                        MaCTPSC: savedCtPsc.MaCTPSC,
                        MaPhuTung: phutung.MaPhuTung,
                        SoLuong: phutung.quantity,
                        ThanhTien: phutung.total,
                    })
                    console.log("DAO. _ctPhuTungPSC: ", _ctPhuTungPSC);
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

