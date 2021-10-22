const mongoose = require('mongoose');

// Definimos nuestro esquema para el modelo de Usuarios
var TWEETschema = mongoose.Schema({
    text: String,
    owner: {
        type: String,
        ref: 'User'
    },
    tweets: {
        type: [String],
        ref: 'Tweet'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

var TWEET = mongoose.model('Tweet', TWEETschema)

module.exports = TWEET;
