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

export async function getInvoices(){
  const [rows] = await pool.query("SELECT faturas.ID, clientes.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, faturas.descricao, faturas.valor, faturas.data FROM faturas INNER JOIN clientes ON faturas.cliente= clientes.id INNER JOIN veiculos ON faturas.veiculo = veiculos.id;");
  return rows;
}