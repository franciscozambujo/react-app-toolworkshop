import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Configuração CORS
export const corsConfig = cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// Rate limiting
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Muitas solicitações deste IP, tente novamente em 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Security headers
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
});

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Prisma errors
  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Conflict',
      message: 'Dados duplicados encontrados'
    });
  }
  
  if (err.code === 'P2025') {
    return res.status(404).json({
      error: 'Not Found',
      message: 'Registo não encontrado'
    });
  }
  
  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Algo correu mal' 
      : err.message
  });
};

// 404 handler
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Rota ${req.originalUrl} não encontrada`
  });
};