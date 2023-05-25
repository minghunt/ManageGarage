import * as carDAO from '../dao/carDAO.js';

// Create a new car
async function createCar(req, res) {
  try {
    const newCar = req.body;
    const createdCar = await carDAO.createCar(newCar);
    res.status(201).json(createdCar);
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all cars
async function getAllCars(req, res) {

  let filters ={};
  if(req.query.MaHieuXe){
    filters.MaHieuXe = req.query.MaHieuXe;
  }
  else if (req.query.TenKH){
    filters.TenKH = req.query.TenKH;
  }
  else if(req.query.TienNo){
    filters.TienNo = req.query.TienNo;
  }
  try {
    const cars = await carDAO.getAllCars({filters});
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
//  Check for BienSo is exist
 
async function checkBienSo(req, res) {
    try{
        const checkCar = req.params.bienSo;
        const car = await carDAO.checkBienSo(checkCar)
        if (car)
        {
            res.status(200).json(car._id);
        }else {
            res.status(200).json({message: "Xe mới" });
        }
    }
    catch (error) {
    res.status(500).json({ error: error.message });
    }
}

export {
    createCar,
    getAllCars,
    getCarById,
    updateCar,
    checkBienSo,
};

