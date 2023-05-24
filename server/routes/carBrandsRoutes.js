import express from 'express';
const router = express.Router();

import * as carBrandsController from '../controllers/carBrandsController.js';

// Get all carBrands
router.get('/', carBrandsController.getAllCarBrands);
// Get course by ID
router.get('/:id', carBrandsController.getCarBrandById);
// Get course by TenHieuXe
router.get('/name/:name', carBrandsController.getCarBrandByName);

// Create a new CarBrand
router.post('/', carBrandsController.createCarBrand);

// Update a CarBrand by ID
router.put('/', carBrandsController.updateCarBrand);

// Delete a CarBrand by ID
router.delete('/:maHieuXe', carBrandsController.deleteCarBrand);

export default router;
