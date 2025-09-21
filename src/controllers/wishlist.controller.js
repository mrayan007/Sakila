const { request, response } = require('../../app');
const wishlistService = require('../services/wishlist.service');

const wishlistController = {
    post: (request, response, next) => {
        const {movieId} = request.body;
        const userId = request.session.user.id;

        const data = {userId, movieId};

        wishlistService.post(data, (error) => {
            if (error) return next(error);
            response.redirect(`/movies/${movieId}`);
        });
    },

    get: (request, response, next) => {
        const userId = request.session.user.id;

        wishlistService.get({userId, filmId: null}, (error, films) => {
            if (error) return next(error);
            if (!films) return response.render('wishlist', {films: null});
            response.render('wishlist', {films, request});
        });
    },

    delete: (request, response, next) => {
        const filmId = request.body.filmId;
        const url = request.body.url;
        console.log(filmId);
        
        const userId = request.session.user.id;

        wishlistService.delete(filmId, userId, error => {
            if (error) return next(error);
            response.redirect(url);
        });
    }
}

module.exports = wishlistController;