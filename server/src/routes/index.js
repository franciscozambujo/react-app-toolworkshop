import { Router } from 'express';
import userRoutes from './userRoutes.js';
import vehicleRoutes from './vehicleRoutes.js';
import repairRoutes from './repairRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import carCheckRoutes from './carCheckRoutes.js';

const router = Router();

// Definir rotas da API (sem /api aqui)
router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/repairs', repairRoutes);
router.use('/reviews', reviewRoutes);
router.use('/car-checks', carCheckRoutes);

// Rota de saúde da API
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API está funcionando', 
    timestamp: new Date().toISOString() 
  });
});

// Rota 404 para endpoints da API
router.all('/*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint não encontrado',
    path: req.originalUrl 
  });
});


export default router;