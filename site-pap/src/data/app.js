import express from 'express';
import { getEmployees, getInvoices}  from './database.js';

const app = express();

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

app.get("/invoices", async (req, res) => {
  const invoices = await getInvoices();
res.send(invoices);
});

app.use((err, req, res, nextTick) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');    
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});