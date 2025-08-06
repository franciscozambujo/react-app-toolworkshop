import { UserService } from '../services/userService.js';

const userService = new UserService();

export const userController = {
  async getAllUsers(req, res) {
    try {
      console.log("getAllUsers foi chamado"); // Debug
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getUsersByEmail(req, res) {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    try {
      const users = await userService.getUserByEmail(email);
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar utilizador por email:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getUsersByUsername(req, res) {
    const { user } = req.query;
    if (!user) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    try {
      const users = await userService.getUserByUsername(user);
      res.json(users);
    } catch (error) {
      console.error('Erro ao buscar utilizador por username:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getUserRole(req, res) {
    const { user } = req.query;
    if (!user) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    try {
      const role = await userService.getUserRole(user);
      res.json(role);
    } catch (error) {
      console.error('Erro ao buscar cargo do utilizador:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async getUserPassword(req, res) {
    const { user } = req.query;
    if (!user) {
      return res.status(400).json({ error: 'Username é obrigatório' });
    }

    try {
      const userData = await userService.getUserPassword(user);
      res.json(userData);
    } catch (error) {
      console.error('Erro ao buscar password do utilizador:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  },

  async createUser(req, res) {
    const { user, password, FullName, email } = req.body;
    
    if (!user || !password || !FullName || !email) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      await userService.createUser({ user, password, fullName: FullName, email });
      res.json({ message: 'Utilizador criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar utilizador:', error);
      res.status(500).json({ message: 'Erro ao criar utilizador' });
    }
  },

  async getClientsByName(req, res) {
    const { searchClients } = req.query;
    if (!searchClients) {
      return res.status(400).json({ error: 'Nome do cliente é obrigatório' });
    }

    try {
      const clients = await userService.getClientsByName(searchClients);
      res.json(clients);
    } catch (error) {
      console.error('Erro ao buscar clientes por nome:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
};