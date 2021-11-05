const mongoose = require('mongoose');

// Definimos nuestro esquema para el modelo de Usuarios
var USERschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id: String,
  tweets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

var USER = mongoose.model("User", USERschema);

module.exports = USER;