const router = require("express").Router();
const controller = require('./users.controller')

router.get('/', controller.getAll)
router.get('/:username', controller.getTweets)
router.post('/', controller.create)
router.patch('/:username', controller.modify)
router.delete('/:username', controller.destroy)

module.exports = router;