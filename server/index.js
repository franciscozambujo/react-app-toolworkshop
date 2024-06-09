const express = require ('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use('/', (req,res) => {
    res.send("Hello World.");
})

app.listen(5000, console.log("Server as started on PORT 5000"))