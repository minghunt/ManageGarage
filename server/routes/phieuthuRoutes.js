import express from 'express';
const router = express.Router();

import * as phieuThuController from '../controllers/phieuThuController.js';


// Create a new PhieuThu
router.post('/', phieuThuController.createphieuthu);
router.get('/', phieuThuController.getphieuthu);


export default router;
