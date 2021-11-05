const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TWEETSschema = new mongoose.Schema({
  text: String,
  owner: {
    type: String,
    required: true,
  }
}, { timestamps : true });

var TWEETS = mongoose.model("Tweet", TWEETSschema);

module.exports = TWEETS;