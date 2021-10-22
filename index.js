const express = require("express");
const mongoose = require('mongoose');
const app = express();

const usersRouter = require('./api/users');
const tweetsRouter = require('./api/tweets')

app.use(express.json());
app.use('/api/users', usersRouter)
app.use('/api/tweets', tweetsRouter)

mongoose.connect('mongodb://localhost/db-twitter', function(err) {
  if (err) throw err;
  console.log('Successfully connected');
});


app.listen(5000, (err) => {
  if (!err) {
    console.log("Servidor listo en el 5000");
  }
});