const bcrypt = require('bcryptjs');
const authDao = require('../daos/auth.dao');
const usersService = require('../services/users.service');

const authService = {
    register: (data, callback) => {
        const {username, password} = data;

        usersService.get(username, (error, userTaken) => {
            if (error) return callback(error, null);

            if (userTaken) return callback(null, true);

            const hashedPassword = bcrypt.hashSync(password, 10);

            authDao.register(username, hashedPassword, (error, response) => {
                if (error) return callback(error, null);
                return callback(null, null);
            });
        });         
    },

    login: (data, callback) => {
        const {username, password} = data;

        usersService.get(username, (error, user) => {
            if (error) return callback(error, null, null);
            if (!user) return callback(null, 'No such user.', null);

            const authenticated = bcrypt.compareSync(password, user.password_hash);
            if (!authenticated) return callback(null, 'Password wrong.', null);
            return callback(null, null, user);
        });
    }
}

module.exports = authService;