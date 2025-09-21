const wishlistDao = require('../daos/wishlist.dao');

const wishlistService = {
    post: (data, callback) => {
        wishlistDao.post(data, (error) => {
            if (error) return callback(error);
            return callback(null);
        });
    },

    get: (data, callback) => {
        const {userId, filmId} = data;

        wishlistDao.get(userId, filmId, (error, films) => {
             console.log('wishlistDao.get result:', films);  
            if (error) return callback(error, null);
            if (filmId) {
                // single movie check: return true/false
                const wish = films.length > 0;
                 console.log('wish for movie', filmId, '=', wish);
                return callback(null, wish);
            } else {
                // no filmId: return all wishlisted movies
                return callback(null, films); // array of movies
            }
        });
    },

    delete: (filmId, userId, callback) => {
        console.log(filmId);
        
        wishlistDao.delete(filmId, userId, error => {
            if (error) return callback(error);
            return callback(null);
        });
    }
}

module.exports = wishlistService;