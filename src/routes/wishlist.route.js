var express = require('express');
var router = express.Router();

const wishlistController = require('../controllers/wishlist.controller');
const mwAuth = require('../mw/auth.mw');

router.post('/', mwAuth, wishlistController.post);
router.get('/', mwAuth, wishlistController.get);
router.post('/delete', mwAuth, wishlistController.delete);

module.exports = router;