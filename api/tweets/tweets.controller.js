const fs = require("fs");
var uniqid = require("uniqid");
const { update } = require("../users/users.model");

const TWEETModel = require("./tweets.model");
const USERModel = require("../../api/users/users.model");

/**
 * GET      /api/tweets                      -> getAll
 * POST     /api/tweets                      -> create
 * GET      /api/tweets/:id                  -> getTweet
 * DELETE   /api/tweets/:id                  -> deleteTweet
 */

module.exports = { getAll, create, getTweet, deleteTweet };

// Devuelve todos los tweets
// GET http://localhost:5000/api/tweets
async function getAll(req, res) {
  const { _sort } = req.query;

  let sort_order

  if (_sort != undefined && _sort == "asc") 
    sort_order = 1
  else 
    sort_order = -1

  console.log(sort_order)

  TWEETModel.find()
      .sort([["createdAt", sort_order]])
      .then((response) => {
        return res.json(response);
      });
}

// Guarda un nuevo tuit en BD
// POST http://localhost:5000/api/tweets
async function create(req, res) {

  var newTweet = new TWEETModel({
    text: req.body.text,
    owner: req.body.owner,
    createdAt: Date.now(),
  });

  let userExist = await USERModel.exists({ username: req.body.owner });

  if (!userExist) {
    return res
      .status(404)
      .send(`El username utilizado: ${req.body.owner}  no existe.`);
  }

  newTweet
    .save()
    .then((response) => {
      return { _id: response._id, owner: response.owner };
    })
    .then(async (response) => {

      USERModel.updateOne(
        { username: response.owner },
        { $push: { tweets: response._id } },
        function (err) {
          if (err) return res.status(400).send(err + "  <== error");
          else
            return res.send(
              "Se ha creado el Tweet correctamente \n" + JSON.stringify({response})
            );
        }
      );
    })
    .catch((e) => {
      return res.status(400).send(e);
    });
}

// Devuelve un twit por su id
// GET http://localhost:5000/api/tweets/:id
function getTweet(req, res) {
  let _id = req.params.id;
  TWEETModel.findById({ _id })
    .then((response) => {
      console.log(response);
      return res.json(response);
    })
    .catch((e) => {
      return res.status(404).send(e);
    });
}

// Borra un twit por su id
// DELETE http://localhost:5000/api/tweets/:id
function deleteTweet(req, res) {
  let _id = req.params.id;
  TWEETModel.deleteOne({ _id }, function (err) {
    if (err) return res.status(400).send(err + " <== este es el error.");
    else
      return res.send("Se ha borrado correctamente el tweet con la id: " + _id);
  });
}