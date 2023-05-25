import * as carDAO from '../dao/carDAO.js';

// Create a new car
async function createCar(req, res) {
  try {
    const newCar = req.body;
    const createdCar = await carDAO.createCar(newCar);
    if(createdCar)
    {
        res.status(201).json(createdCar);
    }
    else{
        const car = await carDAO.updateCar(newCar);
        if (car) {
            res.status(200).json({message: "Cập nhật thành công"});
          } else {
            res.status(404).json({ error: 'Car not found' });
          }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all cars
async function getAllCars(req, res) {
  try {
    const cars = await carDAO.getAllCars();
    console.log("Controller. Cars: ", cars);
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get a car by ID
async function getCarById(req, res) {
  try {
    const carId = req.params.id;
    const car = await carDAO.getCarById(carId);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: 'car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Update a car by ID
async function updateCar(req, res) {
  try {
    const updateCar = req.body;
    const car = await carDAO.updateCar(updateCar);
    if (car) {
      res.status(200).json({message: "Cập nhật thành công"});
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
};

