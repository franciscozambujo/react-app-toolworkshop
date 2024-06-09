import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user : 'root',
  password : '',
  database: 'db_oficina'
}).promise();

export async function getUsers(){
  const [rows] = await pool.query("SELECT * FROM utilizadores;");
  return rows;
}

export async function getVehicles(){
  const [rows] = await pool.query("SELECT * FROM veiculos;");
  return rows;
}

export async function getCarChecks(){
  const [rows] = await pool.query("SELECT * FROM revisoes;");
  return rows;
}

export async function getCarChecksByUser(user){
  const query = `SELECT * FROM revisoes WHERE nome_cliente = ?;`;
  const [rows] = await pool.query(query, [user]);
  return rows;
}

export async function getInvoices(){
  const [rows] = await pool.query("SELECT reparacoes.ID, utilizadores.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN utilizadores ON reparacoes.cliente = utilizadores.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id;");
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
  const query =  `SELECT matricula FROM veiculos JOIN utilizadores ON veiculos.cliente = utilizadores.id WHERE utilizadores.nome LIKE ?`;
  const [rows] = await pool.query(query, [nomeCliente]);
  return rows;
}

export async function getRepairsLastWeek() {
  const [rows] =  await pool.query("SELECT COUNT(*) AS reparacoes_ultima_semana FROM reparacoes WHERE data >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);");
  return rows;
}

export async function getRepairs(searchRepairs) {
  const query = `SELECT reparacoes.ID, utilizadores.nome, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN utilizadores ON reparacoes.cliente = utilizadores.id INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id WHERE utilizadores.nome LIKE ?`;
  const [rows] = await pool.query(query, [searchRepairs]);
  return rows;
}

export async function getClientsByName(searchClients) {
  const query =  `SELECT * FROM utilizadores WHERE utilizadores.nome = ?`;
  const [rows] = await pool.query(query, [searchClients]);
  return rows;
}

export async function getCarsByClient(clientID) {
  const query =  `SELECT marca, modelo, matricula FROM veiculos JOIN utilizadores ON veiculos.cliente = utilizadores.id WHERE utilizadores.id = ?`;
  const [rows] = await pool.query(query, [clientID]);
  return rows;
}

export async function getCarsByInfo(name) {
  const query =  `SELECT marca, modelo, matricula FROM veiculos JOIN utilizadores ON veiculos.cliente = utilizadores.id WHERE utilizadores.nome = ?`;
  const [rows] = await pool.query(query, [name]);
  return rows;
}

export async function getUsersByEmail(email) {
  const query =  `SELECT * FROM utilizadores WHERE utilizadores.email LIKE ?`;
  const [rows] = await pool.query(query, [email]);
  return rows;
}

export async function getUsersByUser(user) {
  const query =  `SELECT * FROM utilizadores WHERE utilizadores.user LIKE ?`;
  const [rows] = await pool.query(query, [user]);
  return rows;
}

export async function getUsersRole(user) {
  const query =  ("SELECT utilizadores.cargo FROM utilizadores WHERE utilizadores.user = ?;");
  const [rows] = await pool.query(query, [user]);
  return rows.length > 0 ? rows[0].cargo : null;
}

export async function getUsersPass(user) {
  const query =  ("SELECT utilizadores.password, utilizadores.cargo FROM utilizadores WHERE utilizadores.user = ?;");
  const [rows] = await pool.query(query, [user]);
  return rows;
}

export async function createCarRepair(plate, description, value, date) {
  try {
    console.log("Parameters:", { plate, description, value, date });

    const [clientResult] = await pool.query(
      "SELECT utilizadores.id FROM utilizadores JOIN veiculos ON utilizadores.id = veiculos.cliente WHERE veiculos.matricula = ?",
      [plate]
    );
    const [vehicleResult] = await pool.query(
      "SELECT veiculos.id FROM veiculos WHERE veiculos.matricula = ?",
      [plate]
    );

    if (clientResult.length === 0 || vehicleResult.length === 0) {
      throw new Error("Cliente ou veículo não encontrado");
    }

    const clientId = clientResult[0].id;
    const vehicleId = vehicleResult[0].id;

    const query = `
      INSERT INTO reparacoes (
        cliente, veiculo, descricao, valor, data
      ) VALUES (?, ?, ?, ?, ?);
    `;
    const values = [clientId, vehicleId, description, value, date];
    await pool.query(query, values);

  } catch (error) {
    console.error("Erro ao criar reparação:", error);
    throw error;
  }
}

export async function createCarCheck(name, phone, car, plate, checkDate) {
  const query =  `INSERT INTO revisoes (nome_cliente, numero_tele, carro, matricula, data_agendada, estado) VALUES (?,?,?,?,?, "Por aprovar");`;
  const values = [name, phone, car, plate, checkDate];
  await pool.query(query, values);
}

export async function createReview(name, email, description, rating) {
  const query =  await pool.query("INSERT INTO avaliacoes (nome, email, descricao, estrelas) VALUES (?,?,?,?);");
  const values = [name, email, description, rating];
  await pool.query(query, values);
}

export async function createUser(user, password, FullName, email) {
  const query =  `INSERT INTO utilizadores (user, password, nome, email, cargo) VALUES (?, ?, ?, ?, 'client');`;
  const values = [user, password, FullName, email];
  await pool.query(query, values);
}

export async function createCarClientByEmail(carBrand, carModel, carPlate, clientEmail) {
  const query =  `INSERT INTO veiculos (marca, modelo, matricula, cliente) VALUES (?, ?, ?, (SELECT id FROM utilizadores WHERE email = ?))`;
  const values = [carBrand, carModel, carPlate, clientEmail];
  await pool.query(query, values);
}

export async function changeCheckState(checkId) {
  const query =  `UPDATE revisoes SET estado = 'Aceite' WHERE id = ?;`;
  const values = [checkId];
  await pool.query(query, values);
}