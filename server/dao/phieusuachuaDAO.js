import phieusuachuaModel from '../models/phieusuachuaModel.js';

const createPSC = async (pscData) => {
    try {
        const newPsc = new phieusuachuaModel(pscData);
        const psc = await newPsc.save();
        console.log("DAO. psc: ", psc);
        return psc;
    } catch (error) {
        throw error;
    }
};

export {
    createPSC,
};

