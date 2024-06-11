import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUsers, 
  getInvoices, 
  getVehicles,
  createReview, 
  getLastReview, 
  getPenultimateReview, 
  getAntantepenultimateReview, 
  getAntepenultimateReview, 
  createCarCheck,
  getCarPlate,
  createUser,
  createCarRepair,
  getUsersByEmail,
  getUsersRole,
  getRepairs,
  getClientsByName,
  getCarsByClient,
  createCarClientByEmail,
  getUsersPass,
  getUsersByUser,
  getCarsByInfo,
  getRepairsLastWeek,
  getCarChecksByUser,
  getCarChecks,
  changeCheckState,
  getRepairsByClientID,
  }  from  './database.js';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get("/users", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.send(vehicles);
});

app.get("/invoices", async (req, res) => {
  const invoices = await getInvoices();
  res.send(invoices);
});

app.get("/carChecks", async (req, res) => {
  const invoices = await getCarChecks();
  res.send(invoices);
});

app.get("/carChecksByUser", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'user is required' });
  }
  try {
    const users = await getCarChecksByUser(user);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/lastReview", async (req, res) => {
  const reviews = await getLastReview();
  res.send(reviews);
});

app.get("/penultimateReview", async (req, res) => {
  const penultimateReview = await getPenultimateReview();
  res.send(penultimateReview);
});

app.get("/antePenultimateReview", async (req, res) => {
  const antePenultimateReview = await getAntepenultimateReview();
  res.send(antePenultimateReview);
});

app.get("/antantePenultimateReview", async (req, res) => {
  const antantePenultimateReview = await getAntantepenultimateReview();
  res.send(antantePenultimateReview);
});

app.get("/repairsLastWeek", async (req, res) => {
  const repairsLastWeek = await getRepairsLastWeek();
  res.send(repairsLastWeek);
});

app.get("/usersByemail", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
  try {
    const users = await getUsersByEmail(email);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/usersByuser", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'user is required' });
  }
  try {
    const users = await getUsersByUser(user);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/usersByRole", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'user is required' });
  }
  try {
    const cargo = await getUsersRole(user);
    res.json(cargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/usersPass", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'user is required' });
  }
  try {
    const cargo = await getUsersPass(user);
    res.json(cargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/usersByRole", async (req, res) => {
  const { user } = req.query;
  if (!user) {
    return res.status(400).json({ error: 'user is required' });
  }
  try {
    const cargo = await getUsersRole(user);
    res.json(cargo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/carPlate', async (req, res) => {
  const { nomeCliente } = req.query;
  if (!nomeCliente) {
    return res.status(400).json({ error: 'nomeCliente is required' });
  }
  try {
    const matriculas = await getCarPlate(nomeCliente);
    res.json(matriculas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/repairs', async (req, res) => {
  const { searchRepairs } = req.query;
  if (!searchRepairs) {
    return res.status(400).json({ error: 'searchRepairs is required' });
  }
  try {
    const searchedRepairs = await getRepairs(searchRepairs);
    res.json(searchedRepairs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/repairsByClientID', async (req, res) => {
  const { clientID } = req.query;
  if (!clientID) {
    return res.status(400).json({ error: 'clientID is required' });
  }
  try {
    const searchedRepairs = await getRepairsByClientID(clientID);
    res.json(searchedRepairs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/clientsByName', async (req, res) => {
  const { searchClients } = req.query;
  if (!searchClients) {
    return res.status(400).json({ error: 'searchClients is required' });
  }
  try {
    const searchedClients = await getClientsByName(searchClients);
    res.json(searchedClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/carsByClient', async (req, res) => {
  const { clientID } = req.query;
  if (!clientID) {
    return res.status(400).json({ error: 'clientID is required' });
  }
  try {
    const searchedCars = await getCarsByClient(clientID);
    res.json(searchedCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/carsByInfo', async (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: ' name is required' });
  }
  try {
    const searchedCars = await getCarsByInfo(name);
    res.json(searchedCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/createCarChecks", async (req, res) => {
  const { name, phone, car, plate, checkDate } = req.body;
  try {
    await createCarCheck(name, phone, car, plate, checkDate);
    res.send({ message: "Agendamento criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar agendamento!" });
  }
});

app.post("/createReviews", async (req, res) => {
  const { name, email, description, rating } = req.body;
  try {
    await createReview(name, email, description, rating);
    res.send({ message: "Review criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar review" });
  }
});

app.post("/createCarRepairs", async (req, res) => {
  const { plate, description, value, date } = req.body;
  try {
    await createCarRepair(plate, description, value, date);
    res.send({ message: "Reparação de carro criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar reparação de carro" });
  }
})

app.post("/createUser", async (req, res) => {
  const { user, password, FullName, email} = req.body;
  try {
    await createUser(user, password, FullName, email);
    res.send({ message: "Utilizador criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar utilizador" });
  }
});

app.post("/createCarClientByEmail", async (req, res) => {
  const { carBrand, carModel, carPlate, clientEmail} = req.body;
  try {
    await createCarClientByEmail(carBrand, carModel, carPlate, clientEmail);
    res.send({ message: "Veículo do cliente criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar veiculo" });
  }
});

app.put("/changeCheckState/:checkId", async (req, res) => {
  const { checkId } = req.params;
  try {
    await changeCheckState(checkId);
    res.send({ message: "checkState alterado" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao alterar estado" });
  }
});

app.use((err, req, res, nextTick) => {
    console.error(err.stack);
    res.status(500).send('A API não está conectada.');    
})

app.listen(3000, () => {
  console.log('API a rodar na porta 3000.');
});