const fs = require('fs');


/**
 * GET      /api/tweets                      -> getAll
 * POST     /api/tweets                      -> createTweet
 * GET      /api/tweets/:id                  -> getTweetById
 * DELETE   /api/tweets/:id                  -> deleteTweet
 */


module.exports = {getAll, createTweet, getTweetById, deleteTweet}

function getAll(req, res) {
  //Faltan errores
  const userName = req.params.username;
  let user = getUserByUsername(userName);
  res.json(user.tweets);
};

function createTweet(req, res) {
  const userName = req.params.username;
  const user = getUserByUsername(userName);
  const newTweet = req.body.text;
  user.tweets.push({
    id: user.tweets.length + 1,
    text: newTweet,
    owner: user.username,
    createdAt: Date.now(),
  });
  res.json(user);
};

function getTweetById(req, res) {
  const userName = req.params.username;
  const tweetID = +req.params.id;
  const user = getUserByUsername(userName);
  const tweet = getTweet(tweetID, user);
  res.json(tweet);
};

function deleteTweet(req, res) {
  const userName = req.params.username;
  const tweetID = +req.params.id;
  const user = getUserByUsername(userName);
  user.tweets = user.tweets.filter((tweet) => tweet.id !== tweetID);
  res.json(user);
};

//--------------------------------------FUNCIONES--------------------------------------------------------------------------------
function getUserByUsername(username) {
    return users.find((user) => user.username == username);
  }

function getTweet(id, user) {
  let tweet = {};
  tweet = user.tweets.find((tweet) => tweet.id == id);
  return tweet;
}