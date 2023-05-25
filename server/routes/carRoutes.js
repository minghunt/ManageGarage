import express from 'express';
const router = express.Router();

import * as carController from '../controllers/carController.js';

// Get all cars
router.get('/', carController.getAllCars);
// Get all cars
router.get('/:id', carController.getCarById);

// Create a new car
router.post('/', carController.createCar);

// Update a car
router.put('/', carController.updateCar);

export default router;
