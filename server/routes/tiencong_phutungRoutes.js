import express from 'express';
const router = express.Router();

import * as tiencong_phutungController from '../controllers/tiencong_phutungController.js';

// Get all TienCong_PhuTung
router.get('/', tiencong_phutungController.getAllTC_PT);

// Create a new TienCong_PhuTung
router.post('/', tiencong_phutungController.createTC_PT);

export default router;
