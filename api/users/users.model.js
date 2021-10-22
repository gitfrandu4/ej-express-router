const mongoose = require('mongoose');

// Definimos nuestro esquema para el modelo de Usuarios
var USERschema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    id: String,
    tweets: {
        type: [String],
        ref: 'Tweet'
    },
    created: {
        type: Date, 
        default: Date.now
    }
})

var USER = mongoose.model('User', USERschema)

module.exports = USER;