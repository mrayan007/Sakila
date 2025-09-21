const pool = require('../db/sql');

const inventoryDao = {
    get: (filmId, callback) => {
        pool.query(`
            SELECT COUNT(inventory_id) AS inventory_count
            FROM inventory
            WHERE film_id = ?
            GROUP BY film_id
            `,
            filmId,
            (error, result) => {
                if (error) return callback(error, null);
                return callback(null, result);
            }
        );
    }
}

module.exports = inventoryDao;