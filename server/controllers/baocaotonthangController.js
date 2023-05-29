import * as baocaotonthangDAO from '../dao/baocaotonthangDAO.js';

// Create a new car
async function createReport(req, res) {
  try {
    const newReport = req.body;
    const createdReport = await baocaotonthangDAO.createReport(newReport);
    res.status(201).json(createdReport);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createReport,
};