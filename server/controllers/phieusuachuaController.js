import * as phieusuachuaDAO from '../dao/phieusuachuaDAO.js';
import ct_phieusuachua from '../models/CT_phieusuachuaModel.js';
import phieusuachuaModel from '../models/phieusuachuaModel.js'
async function createPSC(req,res) {
    try {
        const newPsc = req.body;
        const createPSC = await phieusuachuaDAO.createPSC(newPsc);
        res.status(200).json(createPSC);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getctPSC(req,res) {
    try {
        const ctPsc =await ct_phieusuachua.find()
        res.status(200).json(ctPsc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getPSC(req,res) {
    try {
        const Psc =await phieusuachuaModel.find()
        res.status(200).json(Psc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
async function getPSCbyMaXe(req,res) {
    try {
        const MaXeR = req.params.MaXe;
        console.log("MaXe: ", MaXeR)
        const Psc =await phieusuachuaModel.find({MaXe: {$eq:MaXeR }})
        res.status(200).json(Psc);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}
export {
    createPSC,getPSC,getctPSC,getPSCbyMaXe
};