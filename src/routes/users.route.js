var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users.controller');
const mwAuth = require('../mw/auth.mw');

router.get('/', mwAuth, usersController.get);
router.post('/', mwAuth, usersController.update);

module.exports = router;