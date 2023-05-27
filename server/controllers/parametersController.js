import * as paraDAO from '../dao/paraDAO.js';

// Get all parameters
async function getPara(req,res) {
  try {
    const paras = await paraDAO.getPara();
    
    res.status(200).json(paras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update parameter
async function updatePara(req, res) {
  try {
    const updatedPara = req.body;
    const para = await paraDAO.updatePara(updatedPara);
    if (para) {
      res.status(200).json(para);
    } else {
      res.status(404).json({ error: 'Para not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getPara,
  updatePara
};

