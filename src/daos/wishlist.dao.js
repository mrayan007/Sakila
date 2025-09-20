const pool = require('../db/sql');

const wishlistDao = {
    post: (data, callback) => {
        const {userId, movieId} = data;

        pool.query(`
            INSERT INTO wishlist
            VALUES (?, ?);
            `,
            [userId, movieId],
            error => {
                if (error) return callback(error);
                return callback(null);
            }
        );
    },

    get: (userId, callback) => {
        pool.query(`
            SELECT f.film_id, f.title, f.description
            FROM film f
            JOIN wishlist w ON w.film_id = f.film_id
            WHERE w.user_id = ?;
            `,
            userId,
            (error, rows) => {
                if (error) return callback(error, null);
                return callback(null, rows);
            }
        );
    }
}

module.exports = wishlistDao;