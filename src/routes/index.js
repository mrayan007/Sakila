var express = require('express');
var router = express.Router();

const storesService = require('../services/stores.service');

/* GET home page. */
router.get('/', function(req, res, next) {
  storesService.getAll(stores => {
    res.render('index', {stores});
  });
});

module.exports = router;
