import express from 'express';
import bodyParser from 'body-parser';
import { getEmployees, 
  getInvoices, 
  getClients, 
  getVehicles, 
  createReview, 
  getLastReview, 
  getPenultimateReview, 
  getAntantepenultimateReview, 
  getAntepenultimateReview, 
  createCarCheck,
  getCarPlate,
  createUser,
  getUsers,
  createCarRepair,
}  from './database.js';

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/employees", async (req, res) => {
  const employees = await getEmployees();
  res.send(employees);
});

app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.send(vehicles);
});

app.get("/clients", async (req, res) => {
  const clients = await getClients();
  res.send(clients);
});

app.get("/invoices", async (req, res) => {
  const invoices = await getInvoices();
  res.send(invoices);
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

app.get("/users", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }
  try {
    const users = await getUsers(email);
    res.json(users);
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
  const { name, plate, description, value, date } = req.body;
  try {
    await createCarRepair(name, plate, description, value, date);
    res.send({ message: "Reparação de carro criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar reparação de carro" });
  }
});

app.post("/createUser", async (req, res) => {
  const { user, email, password} = req.body;
  try {
    await createUser(user, email, password);
    res.send({ message: "Utilizador criado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar utilizador" });
  }
});



app.use((err, req, res, nextTick) => {
    console.error(err.stack);
    res.status(500).send('A API não está conectada.');    
})

app.listen(3000, () => {
  console.log('API a rodar na porta 3000.');
});