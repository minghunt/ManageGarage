import express from 'express';
const router = express.Router();

import * as phuTungController from '../controllers/phuTungController.js';

// Get all PhuTung
router.get('/', phuTungController.getAllPhuTung);

// Create a new PhuTung
router.post('/', phuTungController.createPhuTung);

// Update a PhuTung
router.put('/', phuTungController.updatePhuTung);

// Delete a PhuTung
router.delete('/:maPhuTung', phuTungController.deletePhuTung);

export default router;
