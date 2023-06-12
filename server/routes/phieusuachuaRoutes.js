import express from 'express';
const router = express.Router();

import * as phieusuachuaController from '../controllers/phieusuachuaController.js';

router.post('/', phieusuachuaController.createPSC);

router.get('/ctPSC',phieusuachuaController.getctPSC)
router.get('/',phieusuachuaController.getPSC)

export default router;
