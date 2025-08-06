import { CarCheckService } from '../services/carCheckService.js';

const carCheckService = new CarCheckService();

export const carCheckController = {
  async getAllCarChecks(req, res) {
    try {
      const checks = await carCheckService.getAllCarChecks();
      const formattedChecks = checks.map(check => ({
        id: check.id,
        cliente: check.client.nome,
        carro: check.carro,
        matricula: check.matricula,
        data_agendada: check.data_agendada,
        estado: check.estado
      }));
      res.json(formattedChecks);
    } catch (error) {
      console.error('Erro ao buscar revisões:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getCarChecksByUser(req, res) {
    const { user } = req.query;
    if (!user) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    try {
      const checks = await carCheckService.getCarChecksByUser(user);
      res.json(checks);
    } catch (error) {
      console.error('Erro ao buscar revisões por utilizador:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async createCarCheck(req, res) {
    const { name, car, plate, checkDate } = req.body;
    
    if (!name || !car || !plate || !checkDate) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      await carCheckService.createCarCheck({ name, car, plate, checkDate });
      res.json({ message: 'Agendamento criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      res.status(500).json({ message: 'Erro ao criar agendamento!' });
    }
  },

  async changeCheckState(req, res) {
    const { checkId, newState } = req.params;
    
    try {
      await carCheckService.changeCheckState(checkId, newState);
      res.json({ message: 'Estado alterado com sucesso' });
    } catch (error) {
      console.error('Erro ao alterar estado:', error);
      res.status(500).json({ message: 'Erro ao alterar estado' });
    }
  }
};