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

    get: (userId, filmId, callback) => {
        if (!filmId) {
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
        } else {
            pool.query(`
                SELECT film_id
                FROM wishlist
                WHERE user_id = ? AND film_id = ?;`,
                [userId, filmId],
                (error, rows) => {
                    if (error) return callback(error, null);
                    return callback(null, rows);
                }
            );
        }
    },

    delete: (filmId, userId, callback) => {
        pool.query(`
            DELETE FROM wishlist
            WHERE user_id = ? AND film_id = ?;
            `,
            [userId, filmId],
            error => {
                if (error) return callback(error);
                return callback(null);
            }
        );
    }
}

module.exports = wishlistDao;