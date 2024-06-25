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
  const [rows] = await pool.query("SELECT r.id,(SELECT u.nome FROM utilizadores u WHERE u.id = r.cliente) AS cliente,r.carro,  r.matricula,  r.data_agendada,  r.estado FROM revisoes r;");
  return rows;
}

export async function getReviews(){
  const [rows] = await pool.query("SELECT * FROM avaliacoes;");
  return rows;
}

export async function getCarChecksByUser(user){
  const query = `SELECT revisoes.* from revisoes INNER JOIN utilizadores on revisoes.cliente = utilizadores.id WHERE utilizadores.user = ?;`;
  const [rows] = await pool.query(query, [user]);
  return rows;
}

export async function getInvoices(){
  const [rows] = await pool.query("SELECT reparacoes.ID, utilizadores.nome AS cliente, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id INNER JOIN utilizadores ON veiculos.cliente = utilizadores.id;");
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

export async function getCarPlate(plate) {
  const query =  `SELECT utilizadores.nome FROM veiculos JOIN utilizadores ON utilizadores.id = veiculos.cliente WHERE matricula = ?`;
  const [rows] = await pool.query(query, [plate]);
  return rows;
}

export async function getRepairsPerMonthByYear(year) {
  const query =  `SELECT YEAR(data) AS ano, CASE MONTH(data) WHEN 1 THEN 'janeiro' WHEN 2 THEN 'fevereiro' WHEN 3 THEN 'março' WHEN 4 THEN 'abril' WHEN 5 THEN 'maio' WHEN 6 THEN 'junho' WHEN 7 THEN 'julho' WHEN 8 THEN 'agosto' WHEN 9 THEN 'setembro' WHEN 10 THEN 'outubro' WHEN 11 THEN 'novembro' WHEN 12 THEN 'dezembro'END AS mes, COUNT(*) AS reparacoes FROM reparacoes WHERE YEAR(data) = ? GROUP BY ano, MONTH(data), mes ORDER BY ano, MONTH(data);`;
  const [rows] = await pool.query(query, [year]);
  return rows;
}

export async function getTotalValueRepairs(year) {
  const query =  `SELECT YEAR(data) AS ano, SUM(valor) AS valor_total, CASE MONTH(data) WHEN 1 THEN 'janeiro' WHEN 2 THEN 'fevereiro' WHEN 3 THEN 'março' WHEN 4 THEN 'abril' WHEN 5 THEN 'maio' WHEN 6 THEN 'junho' WHEN 7 THEN 'julho' WHEN 8 THEN 'agosto' WHEN 9 THEN 'setembro' WHEN 10 THEN 'outubro' WHEN 11 THEN 'novembro' WHEN 12 THEN 'dezembro' END AS mes, COUNT(*) AS reparacoes FROM   reparacoes WHERE   YEAR(data) = ?GROUP BY   ano,   mes ORDER BY   ano,   MONTH(data);`;
  const [rows] = await pool.query(query, [year]);
  return rows;
}

export async function getRepairs(searchRepairs) {
  const query = `SELECT reparacoes.ID, utilizadores.nome, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id INNER JOIN utilizadores ON veiculos.cliente = utilizadores.id WHERE utilizadores.nome LIKE ?;`;
  const [rows] = await pool.query(query, [searchRepairs]);
  return rows;
}

export async function getRepairsByClientID(clientID) {
  const query = `SELECT reparacoes.ID, utilizadores.nome, veiculos.marca AS veiculo, veiculos.matricula AS matricula, reparacoes.descricao, reparacoes.valor, reparacoes.data FROM reparacoes INNER JOIN veiculos ON reparacoes.veiculo = veiculos.id INNER JOIN utilizadores ON veiculos.cliente = utilizadores.id WHERE utilizadores.id LIKE ?;`;
  const [rows] = await pool.query(query, [clientID]);
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
    //console.log("Parameters:", { plate, description, value, date });

    const [vehicleResult] = await pool.query(
      "SELECT id FROM veiculos WHERE matricula =?",
      [plate]
    );

    if (vehicleResult.length === 0) {
      throw new Error("Veículo não encontrado");
    }

    const vehicleId = vehicleResult[0].id;
    const query = `
      INSERT INTO reparacoes (
        veiculo, descricao, valor, data
      ) VALUES (?,?,?,?);
    `;
    const values = [vehicleId, description, value, date];
    await pool.query(query, values);

  } catch (error) {
    console.error("Erro ao criar reparação:", error);
    throw error;
  }
}

export async function createCarCheck(name, car, plate, checkDate) {
  const query = `INSERT INTO revisoes (cliente, carro, matricula, data_agendada, estado) VALUES (?,?,?,?, "Por aprovar");`;
  const values = [name, car, plate, checkDate];
  await pool.query(query, values);
}

export async function createReview(name, email, description, rating) {
  const query =  `INSERT INTO avaliacoes (nome, email, descricao, estrelas) VALUES (?,?,?,?);`;
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

export async function changeCheckState(checkId, newState) {
  const query =  `UPDATE revisoes SET estado = ? WHERE id = ?;`;
  const values = [newState, checkId];
  await pool.query(query, values);
}

export async function deleteCar(carId, carPlate) {
  const query =  `DELETE v FROM veiculos v JOIN utilizadores u ON v.cliente = u.id WHERE u.id = ? AND v.matricula = ?;`;
  const values = [carId, carPlate];
  await pool.query(query, values);
}

export async function deleteRepair(plateId, description, data) {
  const query =  `DELETE FROM reparacoes WHERE veiculo IN (SELECT id FROM veiculos WHERE matricula = ?) AND reparacoes.descricao = ? AND reparacoes.data = ?`;
  const values = [plateId, description, data];
  await pool.query(query, values);
}