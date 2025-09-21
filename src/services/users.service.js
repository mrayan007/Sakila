const usersDao = require('../daos/users.dao');

const usersService = {
    get: (username, callback) => {
        if (!username) {
            usersDao.get(null, (error, users) => {
                if (error) return callback(error, null);
                if (users.length === 0) return callback(null, null);
                return callback(null, users);
            });
        }

        else {
            usersDao.get(username, (error, user) => {
                if (error) return callback(error, null);
                if (user.length === 0) return callback(null, null);
                return callback(null, user[0]);
            });
        }
    },

    update: (data, callback) => {
        const { user, newUser } = data;

        usersDao.update(user, newUser, error => {
            if (error) return callback(error);
            return callback();
        });
    }
}

module.exports = usersService;