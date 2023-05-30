import * as baocaotonDAO from '../dao/baocaotonDAO.js';

// Create a new car
async function createReport(req, res) {
  try {
    const newReport = req.body;
    const createdReport = await baocaotonDAO.createReport(newReport);
    res.status(201).json(createdReport);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a car by Month
async function getReportByMonth(req, res) {
    try {
      const month = Number(req.query.month);
      const year = Number(req.query.year);
      console.log(month)
      const report = await baocaotonDAO.getReportByMonth(month, year);
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ error: 'report not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
export {
  createReport,
  getReportByMonth
};