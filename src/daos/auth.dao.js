const pool = require('../db/sql');

const authDao = {
    register: (username, password, callback) => {
        pool.query(`
            INSERT INTO user (username, password_hash)
            VALUES (?, ?);`,
            [username, password], (error, result) => {
                if (error) return callback(error, null);
                return callback(null, true);
            }
        );
    }
}

module.exports = authDao;