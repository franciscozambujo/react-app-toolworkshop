import { prisma } from '../lib/prisma.js';

export class CarCheckService {
  async getAllCarChecks() {
    return await prisma.carCheck.findMany({
      include: {
        client: {
          select: {
            nome: true
          }
        }
      },
      orderBy: {
        data_agendada: 'desc'
      }
    });
  }

  async getCarChecksByUser(username) {
    return await prisma.carCheck.findMany({
      where: {
        client: {
          user: username
        }
      },
      include: {
        client: {
          select: {
            nome: true
          }
        }
      },
      orderBy: {
        data_agendada: 'desc'
      }
    });
  }

  async createCarCheck(checkData) {
    const { name, car, plate, checkDate } = checkData;
    
    // Assumindo que 'name' é o ID do cliente
    return await prisma.carCheck.create({
      data: {
        clientId: parseInt(name),
        carro: car,
        matricula: plate,
        data_agendada: new Date(checkDate),
        estado: 'Por aprovar'
      }
    });
  }

  async changeCheckState(checkId, newState) {
    return await prisma.carCheck.update({
      where: {
        id: parseInt(checkId)
      },
      data: {
        estado: newState
      }
    });
  }
}