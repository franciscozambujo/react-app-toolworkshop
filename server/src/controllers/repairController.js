import { RepairService } from '../services/repairService.js';

const repairService = new RepairService();

export const repairController = {
  async getAllInvoices(req, res) {
    try {
      const invoices = await repairService.getAllInvoices();
      const formattedInvoices = invoices.map(invoice => ({
        ID: invoice.id,
        cliente: invoice.vehicle.client.nome,
        veiculo: invoice.vehicle.marca,
        matricula: invoice.vehicle.matricula,
        descricao: invoice.descricao,
        valor: invoice.valor,
        data: invoice.data
      }));
      res.json(formattedInvoices);
    } catch (error) {
      console.error('Erro ao buscar faturas:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getRepairs(req, res) {
    const { searchRepairs } = req.query;
    if (!searchRepairs) {
      return res.status(400).json({ error: 'Termo de pesquisa é obrigatório' });
    }

    try {
      const repairs = await repairService.getRepairs(searchRepairs);
      const formattedRepairs = repairs.map(repair => ({
        ID: repair.id,
        nome: repair.vehicle.client.nome,
        veiculo: repair.vehicle.marca,
        matricula: repair.vehicle.matricula,
        descricao: repair.descricao,
        valor: repair.valor,
        data: repair.data
      }));
      res.json(formattedRepairs);
    } catch (error) {
      console.error('Erro ao buscar reparações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getRepairsByClientId(req, res) {
    const { clientID } = req.query;
    if (!clientID) {
      return res.status(400).json({ error: 'ID do cliente é obrigatório' });
    }

    try {
      const repairs = await repairService.getRepairsByClientId(clientID);
      const formattedRepairs = repairs.map(repair => ({
        ID: repair.id,
        nome: repair.vehicle.client.nome,
        veiculo: repair.vehicle.marca,
        matricula: repair.vehicle.matricula,
        descricao: repair.descricao,
        valor: repair.valor,
        data: repair.data
      }));
      res.json(formattedRepairs);
    } catch (error) {
      console.error('Erro ao buscar reparações por cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getRepairsPerMonthByYear(req, res) {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ error: 'Ano é obrigatório' });
    }

    try {
      const repairs = await repairService.getRepairsPerMonthByYear(year);
      res.json(repairs);
    } catch (error) {
      console.error('Erro ao buscar reparações por mês:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getTotalValueRepairs(req, res) {
    const { year } = req.query;
    if (!year) {
      return res.status(400).json({ error: 'Ano é obrigatório' });
    }

    try {
      const repairs = await repairService.getTotalValueRepairs(year);
      res.json(repairs);
    } catch (error) {
      console.error('Erro ao buscar valor total de reparações:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async createCarRepair(req, res) {
    const { plate, description, value, date } = req.body;
    
    if (!plate || !description || !value || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      await repairService.createCarRepair({ plate, description, value, date });
      res.json({ message: 'Reparação de carro criada com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar reparação:', error);
      res.status(500).json({ message: 'Erro ao criar reparação de carro' });
    }
  },

  async deleteRepair(req, res) {
    const { plateId, description, data } = req.params;
    
    try {
      await repairService.deleteRepair(plateId, description, data);
      res.json({ message: 'Reparação eliminada' });
    } catch (error) {
      console.error('Erro ao eliminar reparação:', error);
      res.status(500).json({ message: 'Erro ao eliminar reparação' });
    }
  }
};