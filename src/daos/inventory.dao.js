const pool = require('../db/sql');

const inventoryDao = {
    get: (filmId, callback) => {
        pool.query(`
            SELECT store_id, COUNT(inventory_id) AS inventory_count
            FROM inventory
            WHERE film_id = ?
            GROUP BY store_id;
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