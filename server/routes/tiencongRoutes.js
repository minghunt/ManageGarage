import express from 'express';
const router = express.Router();

import * as tiencongController from '../controllers/tienCongController.js';

// Get all TienCong
router.get('/', tiencongController.getAllTienCong);

// Create a new TienCong
router.post('/', tiencongController.createTienCong);

// Update a TienCong
router.put('/', tiencongController.updateTienCong);

// Delete a TienCong
router.delete('/:maTienCong', tiencongController.deleteTienCong);

export default router;
