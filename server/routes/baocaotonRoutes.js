import express from 'express';
const router = express.Router();

import * as baocaotonController from '../controllers/baocaotonController.js';


// Get all cars
router.get('/', baocaotonController.getReportByMonth);
// Post
router.post('/', baocaotonController.createReport);


export default router;
