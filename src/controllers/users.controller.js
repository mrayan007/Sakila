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
    }
}

module.exports = usersController;