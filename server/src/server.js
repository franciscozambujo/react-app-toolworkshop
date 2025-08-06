import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js'; // Importe o router principal

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Debug: mostra todas as rotas registradas
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Conecte todas as rotas com prefixo /api
app.use('/api', router); // Todas as rotas do index.js serão prefixadas com /api

app.listen(PORT, () => {
  console.log(`🚀 Servidor a rodar na porta ${PORT}`);
  console.log(`📊 Teste: http://localhost:${PORT}/api/health`);
});