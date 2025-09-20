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
    }
}

module.exports = usersService;