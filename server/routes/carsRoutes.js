import express from 'express';
const router = express.Router();

import * as carsController from '../controllers/carsController.js';

// Get all cars
router.get('/', carsController.getAllCars);
// Get course by ID
router.get('/:id', carsController.getCarById);
// Get course by TenHieuXe
router.get('/name/:name', carsController.getCarByName);

// Create a new Car
router.post('/', carsController.createCar);

// Update a Car by ID
router.put('/:id', carsController.updateCar);

// Delete a Car by ID
router.delete('/:maHieuXe', carsController.deleteCar);

export default router;
