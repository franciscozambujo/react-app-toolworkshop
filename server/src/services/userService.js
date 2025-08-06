import { prisma } from '../lib/prisma.js';

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        user: true,
        password: true,
        nome: true,
        email: true,
        cargo: true,
      }
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findMany({
      where: {
        email: {
          contains: email
        }
      }
    });
  }

  async getUserByUsername(username) {
    return await prisma.user.findMany({
      where: {
        user: {
          contains: username
        }
      }
    });
  }

  async getUserRole(username) {
    const user = await prisma.user.findUnique({
      where: {
        user: username
      },
      select: {
        cargo: true
      }
    });
    return user?.cargo || null;
  }

  async getUserPassword(username) {
    return await prisma.user.findMany({
      where: {
        user: username
      },
      select: {
        password: true,
        cargo: true
      }
    });
  }

  async createUser(userData) {
    const { user, password, fullName, email } = userData;
    return await prisma.user.create({
      data: {
        user,
        password,
        nome: fullName,
        email,
        cargo: 'client'
      }
    });
  }

  async getClientsByName(name) {
    return await prisma.user.findMany({
      where: {
        nome: name
      }
    });
  }
}