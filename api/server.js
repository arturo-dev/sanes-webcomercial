const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('*', function (req, res) {
  res.send(fs.readFileSync(`${__dirname}${req.path}.json`));
});

app.listen(3000, () => {
  console.log("El servidor está inicializado en el puerto 3000");
});
