const express = require("express");

const app = express();
app.disable("x-powered-by")

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/db-twitter', function(err) {
  if (err) throw err;
  console.log('Successfully connected');
});

const usersRouter = require("./api/users");
const tweetsRouter = require("./api/tweets");

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/tweets", tweetsRouter);

app.listen(5000, (err) => {
  if (!err) {
    console.log("Servidor listo en el 5000");
  }
});


