const moviesDao = require('../daos/movies.dao');
const inventoryService = require('../services/inventory.service');

const moviesService = {
    get: (movieId, sort, order, genre, rating, search, callback) => {
        moviesDao.get(movieId, sort, order, genre, rating, search, (err, movies) => {
            if (err) return callback(err);
            if (movieId) {
                inventoryService.get(movieId, (error, inventory) => {
                    if (error) return callback(error, null);
                    if (!inventory) return callback(null, null);
                    return callback(undefined, {movies, inventory});
                });

                return;
            }

            return callback(undefined, movies)
        });
    }
};

module.exports = moviesService