import mysql from 'mysql2';

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'db_oficina'
}).promise();

export async function getEmployees(){
  const [rows] = await pool.query("SELECT * FROM empregados;");
  return rows;
}
export async function getClients(){
  const [rows] = await pool.query("SELECT * FROM clientes;");
  return rows;
}
export async function GetVehicles(){
  const [rows] = await pool.query("SELECT * FROM veiculos;");
  return rows;
}

export async function getInvoices(){
  const [rows] = await pool.query("SELECT reparacoes.ID, clientes.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN clientes ON reparacoes.cliente= clientes.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id;");
  return rows;
}