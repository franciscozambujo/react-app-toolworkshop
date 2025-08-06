import { prisma } from '../lib/prisma.js';

export class ReviewService {
  async getAllReviews() {
    return await prisma.review.findMany({
      orderBy: {
        id: 'desc'
      }
    });
  }

  async getLastReview() {
    return await prisma.review.findFirst({
      orderBy: {
        id: 'desc'
      }
    });
  }

  async getPenultimateReview() {
    return await prisma.review.findFirst({
      orderBy: {
        id: 'desc'
      },
      skip: 1
    });
  }

  async getAntepenultimateReview() {
    return await prisma.review.findFirst({
      orderBy: {
        id: 'desc'
      },
      skip: 2
    });
  }

  async getAntantepenultimateReview() {
    return await prisma.review.findFirst({
      orderBy: {
        id: 'desc'
      },
      skip: 3
    });
  }

  async createReview(reviewData) {
    const { name, email, description, rating } = reviewData;
    return await prisma.review.create({
      data: {
        nome: name,
        email,
        descricao: description,
        estrelas: parseInt(rating)
      }
    });
  }
}