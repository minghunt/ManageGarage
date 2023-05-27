import * as phieusuachuaDAO from '../dao/phieusuachuaDAO.js';

async function createPSC(req,res) {
    try {
        const newPsc = req.body;

        const createPSC = await phieusuachuaDAO.createPSC(newPsc);
        console.log("Controller. createPSC: ", createPSC);
        res.status(200).json(createPSC);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    createPSC,
};

