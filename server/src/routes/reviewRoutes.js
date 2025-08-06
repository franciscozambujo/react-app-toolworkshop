import { Router } from 'express';
import { reviewController } from '../controllers/reviewController.js';

const router = Router();

// GET routes
router.get('/', reviewController.getAllReviews);
router.get('/last', reviewController.getLastReview);
router.get('/penultimate', reviewController.getPenultimateReview);
router.get('/antepenultimate', reviewController.getAntepenultimateReview);
router.get('/antantepenultimate', reviewController.getAntantepenultimateReview);

// POST routes
router.post('/', reviewController.createReview);

export default router;