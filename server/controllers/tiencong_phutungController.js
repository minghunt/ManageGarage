import * as tiencong_phutungDAO from '../dao/tiencong_phutungDAO.js';

async function createTC_PT(req, res) {
    try {
      const newTC_PT = req.body;  
      const createdTC_PT = await tiencong_phutungDAO.createTC_PT(newTC_PT);
      res.status(201).json(createdTC_PT);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

async function getAllTC_PT(req, res) {
  try {
    const tc_pt = await tiencong_phutungDAO.getAllTc_Pt();
    res.status(200).json(tc_pt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
    createTC_PT,
    getAllTC_PT,
}