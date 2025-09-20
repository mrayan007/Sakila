var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users.controller');

router.post('/', usersController.get);

module.exports = router;