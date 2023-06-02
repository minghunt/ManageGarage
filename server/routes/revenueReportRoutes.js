import express from 'express';
const router = express.Router();

import * as revenueReportController from '../controllers/revenueReportController.js';


// Create a new PhieuThu
router.post('/', revenueReportController.getrevenueReport);


export default router;
