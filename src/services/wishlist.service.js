const wishlistDao = require('../daos/wishlist.dao');

const wishlistService = {
    post: (data, callback) => {
        wishlistDao.post(data, (error) => {
            if (error) return callback(error);
            return callback(null);
        });
    },

    get: (userId, callback) => {
        wishlistDao.get(userId, (error, films) => {
            if (error) return callback(error, null);
            if (films.length === 0) return callback(null, null);
            return callback(null, films);
        });
    }
}

module.exports = wishlistService;