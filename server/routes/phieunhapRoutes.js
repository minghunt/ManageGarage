import express from 'express';
const router = express.Router();

import * as phieuNhapController from '../controllers/phieuNhapController.js';


// Create a new PhieuNhap
router.post('/', phieuNhapController.createphieunhap);

router.get('/ctphieunhap', phieuNhapController.getctphieunhap);

export default router;
