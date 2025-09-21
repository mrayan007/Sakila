const usersService = require('../services/users.service');

const usersController = {
    get: (request, response, next) => {
        const {username = null} = request.body;

        usersService.get(username, (error, result) => {
            if (error) return next(error);
            
            if (!result) {
                if (username) {
                    return response.send('No users found.');
                }
                else {
                    return response.send('User not found.');
                }
            }
            
            response.json(result);
        });
    },

    update: (request, response, next) => {
        const user = request.session.user.username;
        const {newUser} = request.body;

        const data = {user, newUser};

        usersService.get(newUser, (error, userTaken) => {
            if (error) return next(error);

            if (userTaken) return response.render('account', {update: true, message: 'User is taken, choose another name.'});

            usersService.update(data, error => {
                if (error) return next(error);

                request.session.user.username = newUser;
                response.redirect('/account');
            });
        });     
    }
}

module.exports = usersController;