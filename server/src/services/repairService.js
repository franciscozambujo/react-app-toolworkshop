import { prisma } from '../lib/prisma.js';

export class RepairService {
  async getAllInvoices() {
    return await prisma.repair.findMany({
      include: {
        vehicle: {
          include: {
            client: {
              select: {
                nome: true
              }
            }
          }
        }
      },
      orderBy: {
        data: 'desc'
      }
    });
  }

  async getRepairs(searchTerm) {
    return await prisma.repair.findMany({
      where: {
        vehicle: {
          client: {
            nome: {
              contains: searchTerm
            }
          }
        }
      },
      include: {
        vehicle: {
          include: {
            client: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    });
  }

  async getRepairsByClientId(clientId) {
    return await prisma.repair.findMany({
      where: {
        vehicle: {
          clientId: parseInt(clientId)
        }
      },
      include: {
        vehicle: {
          include: {
            client: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    });
  }

  async getRepairsPerMonthByYear(year) {
    const repairs = await prisma.$queryRaw`
      SELECT 
        YEAR(data) AS ano,
        CASE MONTH(data) 
          WHEN 1 THEN 'janeiro'
          WHEN 2 THEN 'fevereiro'
          WHEN 3 THEN 'março'
          WHEN 4 THEN 'abril'
          WHEN 5 THEN 'maio'
          WHEN 6 THEN 'junho'
          WHEN 7 THEN 'julho'
          WHEN 8 THEN 'agosto'
          WHEN 9 THEN 'setembro'
          WHEN 10 THEN 'outubro'
          WHEN 11 THEN 'novembro'
          WHEN 12 THEN 'dezembro'
        END AS mes,
        COUNT(*) AS reparacoes
      FROM reparacoes 
      WHERE YEAR(data) = ${parseInt(year)}
      GROUP BY ano, MONTH(data), mes 
      ORDER BY ano, MONTH(data)
    `;
    return repairs;
  }

  async getTotalValueRepairs(year) {
    const repairs = await prisma.$queryRaw`
      SELECT 
        YEAR(data) AS ano,
        SUM(valor) AS valor_total,
        CASE MONTH(data) 
          WHEN 1 THEN 'janeiro'
          WHEN 2 THEN 'fevereiro'
          WHEN 3 THEN 'março'
          WHEN 4 THEN 'abril'
          WHEN 5 THEN 'maio'
          WHEN 6 THEN 'junho'
          WHEN 7 THEN 'julho'
          WHEN 8 THEN 'agosto'
          WHEN 9 THEN 'setembro'
          WHEN 10 THEN 'outubro'
          WHEN 11 THEN 'novembro'
          WHEN 12 THEN 'dezembro'
        END AS mes,
        COUNT(*) AS reparacoes
      FROM reparacoes 
      WHERE YEAR(data) = ${parseInt(year)}
      GROUP BY ano, mes 
      ORDER BY ano, MONTH(data)
    `;
    return repairs;
  }

  async createCarRepair(repairData) {
    const { plate, description, value, date } = repairData;

    const vehicle = await prisma.vehicle.findFirst({
      where: {
        matricula: plate
      }
    });

    if (!vehicle) {
      throw new Error('Veículo não encontrado');
    }

    return await prisma.repair.create({
      data: {
        vehicleId: vehicle.id,
        descricao: description,
        valor: parseFloat(value),
        data: new Date(date)
      }
    });
  }

  async deleteRepair(plateId, description, data) {
    return await prisma.repair.deleteMany({
      where: {
        vehicle: {
          matricula: plateId
        },
        descricao: description,
        data: new Date(data)
      }
    });
  }
}