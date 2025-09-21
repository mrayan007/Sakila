var express = require('express');
var router = express.Router();

const accountController = require('../controllers/account.controller');
const mwAuth = require('../mw/auth.mw');

router.get('/:update?', mwAuth, accountController.get);

module.exports = router;