import * as phieusuachuaDAO from '../dao/phieusuachuaDAO.js';

async function createPSC(req,res) {
    try {
        const newPsc = req.body;
        console.log("Req.body: ", req.body);
        const createPSC = await phieusuachuaDAO.createPSC(newPsc);
        res.status(200).json(createPSC);
    } catch (error) {
        res.status(500).json({ messsage:"Lỗi: ", error: error.message });
    }
}

export {
    createPSC,
};