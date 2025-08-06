import { Router } from 'express';
import { vehicleController } from '../controllers/vehicleController.js';

const router = Router();

// GET routes
router.get('/', vehicleController.getAllVehicles);
router.get('/by-plate', vehicleController.getCarPlate);
router.get('/by-client', vehicleController.getCarsByClient);
router.get('/by-client-name', vehicleController.getCarsByInfo);

// POST routes
router.post('/', vehicleController.createCarForClient);

// DELETE routes
router.delete('/:carId/:carPlate', vehicleController.deleteCar);

export default router;