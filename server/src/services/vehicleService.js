import { prisma } from '../lib/prisma.js';

export class VehicleService {
  async getAllVehicles() {
    return await prisma.vehicle.findMany({
      include: {
        client: {
          select: {
            nome: true
          }
        }
      }
    });
  }

  async getCarPlate(plate) {
    return await prisma.vehicle.findMany({
      where: {
        matricula: plate
      },
      include: {
        client: {
          select: {
            nome: true
          }
        }
      }
    });
  }

  async getCarsByClient(clientId) {
    return await prisma.vehicle.findMany({
      where: {
        clientId: parseInt(clientId)
      },
      select: {
        marca: true,
        modelo: true,
        matricula: true
      }
    });
  }

  async getCarsByInfo(clientName) {
    return await prisma.vehicle.findMany({
      where: {
        client: {
          nome: clientName
        }
      },
      select: {
        marca: true,
        modelo: true,
        matricula: true
      }
    });
  }

  async createCarForClient(vehicleData) {
    const { carBrand, carModel, carPlate, clientEmail } = vehicleData;
    
    const client = await prisma.user.findUnique({
      where: {
        email: clientEmail
      }
    });

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return await prisma.vehicle.create({
      data: {
        marca: carBrand,
        modelo: carModel,
        matricula: carPlate.toUpperCase(),
        clientId: client.id
      }
    });
  }

  async deleteCar(clientId, carPlate) {
    return await prisma.vehicle.deleteMany({
      where: {
        clientId: parseInt(clientId),
        matricula: carPlate
      }
    });
  }
}