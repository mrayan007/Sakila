const pool = require('../db/sql');

const usersDao = {
    get: (username, callback) => {
        if (!username) {
            pool.query(`
                SELECT *
                FROM user;
                `,
                (error, users) => {
                    if (error) return callback(error, null);
                    return callback(null, users);
                }
            );
        }

        else {
            pool.query(`
                SELECT *
                FROM user
                WHERE username = ?;`,
                [username],
                (error, user) => {
                    if (error) return callback(error, null);
                    return callback(null, user);
                }
            );
        }
    },

    update: (user, newUser, callback) => {
        pool.query(`
            UPDATE user
            SET username = ?
            WHERE username = ?;
            `,
            [newUser, user],
            error => {
                if (error) return callback(error);
                return callback();
            }
        );
    }
}

module.exports = usersDao;