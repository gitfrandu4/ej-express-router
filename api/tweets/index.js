const router = require("express").Router();
const controller = require("./tweets.controller.js");

router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getTweet);
router.delete("/:id", controller.deleteTweet);

module.exports = router;
