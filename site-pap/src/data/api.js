import express from 'express';
import bodyParser from 'body-parser';
import { getEmployees, getInvoices , getClients, getVehicles, createReview, getLastReview, getPenultimateReview, getAntantepenultimateReview, getAntepenultimateReview, createCarCheck}  from './database.js';

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

app.post("/createReviews", async (req, res) => {
  const { name, email, description } = req.body;
  try {
    await createReview(name, email, description);
    res.send({ message: "Review criada com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Erro ao criar review" });
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

app.use((err, req, res, nextTick) => {
    console.error(err.stack);
    res.status(500).send('A API não está conectada.');    
})

app.listen(3000, () => {
  console.log('API a rodar na porta 3000.');
});