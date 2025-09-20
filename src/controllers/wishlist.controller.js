const wishlistService = require('../services/wishlist.service');

const wishlistController = {
    post: (request, response, next) => {
        const {movieId} = request.body;
        const userId = request.session.user.id;

        const data = {userId, movieId};

        wishlistService.post(data, (error) => {
            if (error) return next(error);
            response.send('you good bro');
        });
    },

    get: (request, response, next) => {
        const userId = request.session.user.id;

        wishlistService.get(userId, (error, films) => {
            if (error) return next(error);
            if (!films) return response.render('wishlist', {films: null});
            response.render('wishlist', {films});
        });
    }
}

module.exports = wishlistController;