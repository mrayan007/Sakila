var express = require('express')
var router = express.Router()

const moviesController = require('../controllers/movies.controller')

router.get('/:movieId?', moviesController.get)

module.exports = router
