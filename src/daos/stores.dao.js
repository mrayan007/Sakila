const pool = require('../db/sql');

const storesDao = {
    get: (callback) => {
        pool.query(`
            SELECT address, district
            FROM address
            JOIN store ON store.address_id = address.address_id;
            `,
            (error, result) => {
                if (error) return callback(error, null);
                return callback(null, result);
            }
        );
    }
}

module.exports = storesDao;