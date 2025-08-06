import { ReviewService } from '../services/reviewService.js';

const reviewService = new ReviewService();

export const reviewController = {
  async getAllReviews(req, res) {
    try {
      const reviews = await reviewService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getLastReview(req, res) {
    try {
      const review = await reviewService.getLastReview();
      res.json(review ? [review] : []);
    } catch (error) {
      console.error('Erro ao buscar última avaliação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getPenultimateReview(req, res) {
    try {
      const review = await reviewService.getPenultimateReview();
      res.json(review ? [review] : []);
    } catch (error) {
      console.error('Erro ao buscar penúltima avaliação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getAntepenultimateReview(req, res) {
    try {
      const review = await reviewService.getAntepenultimateReview();
      res.json(review ? [review] : []);
    } catch (error) {
      console.error('Erro ao buscar antepenúltima avaliação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getAntantepenultimateReview(req, res) {
    try {
      const review = await reviewService.getAntantepenultimateReview();
      res.json(review ? [review] : []);
    } catch (error) {
      console.error('Erro ao buscar quarta última avaliação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async createReview(req, res) {
    const { name, email, description, rating } = req.body;
    
    if (!name || !email || !description || !rating) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      await reviewService.createReview({ name, email, description, rating });
      res.json({ message: 'Review criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar review:', error);
      res.status(500).json({ message: 'Erro ao criar review' });
    }
  }
};