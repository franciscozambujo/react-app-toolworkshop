import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: '',
  database: process.env.DB_NAME
}).promise();

export async function getEmployees(){
  const [rows] = await pool.query("SELECT * FROM empregados;");
  return rows;
}
export async function getClients(){
  const [rows] = await pool.query("SELECT * FROM clientes;");
  return rows;
}
export async function getVehicles(){
  const [rows] = await pool.query("SELECT * FROM veiculos;");
  return rows;
}

export async function getInvoices(){
  const [rows] = await pool.query("SELECT reparacoes.ID, clientes.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN clientes ON reparacoes.cliente= clientes.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id;");
  return rows;
}

export async function getLastReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes ORDER BY id DESC LIMIT 1;");
  return rows;
}

export async function getPenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 1);");
  return rows;
}

export async function getAntepenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 2);");
  return rows;
}

export async function getAntantepenultimateReview() {
  const [rows] = await pool.query("SELECT id, nome, email, descricao, estrelas FROM avaliacoes WHERE id = (SELECT id FROM avaliacoes ORDER BY id DESC LIMIT 1 OFFSET 3);");
  return rows;
} 

export async function getCarPlate(nomeCliente) {
  const query = `SELECT matricula FROM veiculos JOIN clientes ON veiculos.cliente = clientes.id WHERE clientes.nome LIKE '%${nomeCliente}%';`;
  const [rows] = await pool.query(query);
  return rows;
}

export async function getRepairs(searchRepairs) {
  const query = `SELECT * FROM reparacoes JOIN veiculos ON reparacoes.veiculo = veiculos.id WHERE veiculos.matricula LIKE '%${searchRepairs}%';`;
  const [rows] = await pool.query(query);
  return rows;
}

export async function getUsersByEmail(email) {
  const query = `SELECT utilizadores.email FROM utilizadores WHERE utilizadores.email LIKE '%${email}%';`;
  const [rows] = await pool.query(query);
  return rows;
}

export async function getUsersRole(user, password) {
  const query = `SELECT utilizadores.cargo FROM utilizadores WHERE utilizadores.user = ? AND utilizadores.password = ?;`;
  const [rows] = await pool.query(query, [user, password]);
  return rows.length > 0 ? rows[0].cargo : null;
}

export async function createCarCheck(name, phone, car, plate, checkDate) {
  const query = "INSERT INTO revisoes (nome, numero_tele, carro, matricula, data_agendada) VALUES (?,?,?,?,?);";
  const values = [name, phone, car, plate, checkDate];
  await pool.query(query, values);
}

export async function createReview(name, email, description, rating) {
  const query = "INSERT INTO avaliacoes (nome, email, descricao, estrelas) VALUES (?,?,?,?);";
  const values = [name, email, description, rating];
  await pool.query(query, values);
}

export async function createCarRepair(name, plate, description, value, date) {
  const query = "INSERT INTO reparacoes (cliente, veiculo, descricao, valor, data) VALUES (?,?,?,?,?);";
  const values = [name, plate, description, value, date];
  await pool.query(query, values);
}

export async function createUser(user, email, password) {
  const query = "INSERT INTO utilizadores (user, email, pass) VALUES (?,?,?);";
  const values = [user, email, password];
  await pool.query(query, values);
}
