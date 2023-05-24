import express from 'express';
const router = express.Router();

import * as parametersController from '../controllers/parametersController.js';

// Get all parameters
router.get('/', parametersController.getPara);

// Update parameters
router.put('/', parametersController.updatePara);

export default router;
