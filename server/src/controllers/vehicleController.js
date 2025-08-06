import { VehicleService } from '../services/vehicleService.js';

const vehicleService = new VehicleService();

export const vehicleController = {
  async getAllVehicles(req, res) {
    try {
      const vehicles = await vehicleService.getAllVehicles();
      res.json(vehicles);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getCarPlate(req, res) {
    const { plate } = req.query;
    if (!plate) {
      return res.status(400).json({ error: 'Matrícula é obrigatória' });
    }

    try {
      const cars = await vehicleService.getCarPlate(plate);
      res.json(cars);
    } catch (error) {
      console.error('Erro ao buscar carro por matrícula:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getCarsByClient(req, res) {
    const { clientID } = req.query;
    if (!clientID) {
      return res.status(400).json({ error: 'ID do cliente é obrigatório' });
    }

    try {
      const cars = await vehicleService.getCarsByClient(clientID);
      res.json(cars);
    } catch (error) {
      console.error('Erro ao buscar carros por cliente:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getCarsByInfo(req, res) {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Nome é obrigatório' });
    }

    try {
      const cars = await vehicleService.getCarsByInfo(name);
      res.json(cars);
    } catch (error) {
      console.error('Erro ao buscar carros por informação:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async createCarForClient(req, res) {
    const { carBrand, carModel, carPlate, clientEmail } = req.body;
    
    if (!carBrand || !carModel || !carPlate || !clientEmail) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      await vehicleService.createCarForClient({ carBrand, carModel, carPlate, clientEmail });
      res.json({ message: 'Veículo do cliente criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      res.status(500).json({ message: 'Erro ao criar veículo' });
    }
  },

  async deleteCar(req, res) {
    const { carId, carPlate } = req.params;
    
    try {
      await vehicleService.deleteCar(carId, carPlate);
      res.json({ message: 'Carro eliminado' });
    } catch (error) {
      console.error('Erro ao eliminar carro:', error);
      res.status(500).json({ message: 'Erro ao eliminar carro' });
    }
  }
};