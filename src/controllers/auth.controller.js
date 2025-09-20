const authService = require('../services/auth.service');

const authController = {
    registerPage: (request, response, next) => {
        response.render('auth/register', {registered: null});
    },

    loginPage: (request, response, next) => {
        response.render('auth/login', {message: null});
    },

    register: (request, response, next) => {
        authService.register(request.body, (error, userTaken) => {
            if (error) return next(error);
            if (userTaken) return response.render('auth/register', {registered: false});
            response.render('auth/register', {registered: true});
        });
    },

    login: (request, response, next) => {
        authService.login(request.body, (error, message, user) => {
            if (error) return next(error);

            if (!user) return response.render('auth/login', {message});
            
            request.session.user = user;
            response.redirect('/movies');
        });
    },

    logout: (request, response, next) => {
        request.session.destroy(error => {
            if (error) return next(error);

            response.clearCookie('connect_sid');
            response.redirect('/movies');
        })
    }
}

module.exports = authController;