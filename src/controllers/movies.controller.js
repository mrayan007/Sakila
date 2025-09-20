const moviesService = require('../services/movies.service');

const moviesController = {
    get: (req, res) => {
        const movieId = req.params.movieId
        const { sort = 'title', order = 'asc', genre = undefined, rating = undefined, search = '' } = req.query

        moviesService.get(movieId, sort, order, genre, rating, search, (err, movies) => {
            if (err) return res.render('errors/500');

            if (movieId) {
                return res.render('movie', { movie: movies.movies, inventory: movies.inventory });
            }

            return res.render('movies', { movies, sort, order, genre, rating, search });
        });
    }
};

module.exports = moviesController;
