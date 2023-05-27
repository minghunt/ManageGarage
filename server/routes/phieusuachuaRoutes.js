import express from 'express';
const router = express.Router();

import * as phieusuachuaController from '../controllers/phieusuachuaController.js';

router.post('/', phieusuachuaController.createPSC);

export default router;
