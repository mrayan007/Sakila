const moviesService = require('../services/movies.service');
const wishlistService = require('../services/wishlist.service');

const moviesController = {
    get: (req, res, next) => {
        const movieId = req.params.movieId
        const { sort = 'title', order = 'asc', genre = undefined, rating = undefined, search = '' } = req.query

        moviesService.get(movieId, sort, order, genre, rating, search, (err, movies) => {
            if (err) return res.render('errors/500');

            if (!movieId) {
                return res.render('movies', { movies, sort, order, genre, rating, search });
            }

            if (!req.session.user) {
                return res.render('movie', { movie: movies.movies, inventory: movies.inventory, wish: false });
            }

            const userId = req.session.user.id;
            wishlistService.get({ userId, filmId: movieId }, (error, wish) => {
                if (error) return next(error);
                return res.render('movie', { movie: movies.movies, inventory: movies.inventory, wish, req });
            });
        });
    }
};

module.exports = moviesController;
