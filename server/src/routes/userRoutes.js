import { Router } from 'express';
import { userController } from '../controllers/userController.js';

const router = Router();

// GET routes
router.get('/', userController.getAllUsers);
router.get('/by-email', userController.getUsersByEmail);
router.get('/by-username', userController.getUsersByUsername);
router.get('/role', userController.getUserRole);
router.get('/password', userController.getUserPassword);
router.get('/clients/by-name', userController.getClientsByName);

// POST routes
router.post('/', userController.createUser);

export default router;