import { Router } from 'express';
import { repairController } from '../controllers/repairController.js';

const router = Router();

// GET routes
router.get('/invoices', repairController.getAllInvoices);
router.get('/search', repairController.getRepairs);
router.get('/by-client', repairController.getRepairsByClientId);
router.get('/stats/monthly', repairController.getRepairsPerMonthByYear);
router.get('/stats/total-value', repairController.getTotalValueRepairs);

// POST routes
router.post('/', repairController.createCarRepair);

// DELETE routes
router.delete('/:plateId/:description/:data', repairController.deleteRepair);

export default router;