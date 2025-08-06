import { Router } from 'express';
import { carCheckController } from '../controllers/carCheckController.js';

const router = Router();

// GET routes
router.get('/', carCheckController.getAllCarChecks);
router.get('/by-user', carCheckController.getCarChecksByUser);

// POST routes
router.post('/', carCheckController.createCarCheck);

// PUT routes
router.put('/:checkId/state/:newState', carCheckController.changeCheckState);

export default router;