var express = require('express');
var router = express.Router();

const wishlistController = require('../controllers/wishlist.controller');

router.post('/', wishlistController.post);
router.get('/', wishlistController.get);

module.exports = router;