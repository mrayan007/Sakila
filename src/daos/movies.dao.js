const pool = require('../db/sql');

const moviesDao = {
    get: (movieId, sort, order, genre, rating, search, callback) => {
        if (movieId === undefined) {
            let query = `
                SELECT f.*, c.name AS category
                FROM film f
                JOIN film_category fc ON f.film_id = fc.film_id
                JOIN category c ON fc.category_id = c.category_id
            `;

            let conditions = [];
            let parameters = [];

            const sortableColumns = ['title', 'length', 'rental_rate'];

            if (genre) {
                conditions.push('c.name = ?');
                parameters.push(genre);
            }

            if (rating) {
                conditions.push('f.rating = ?');
                parameters.push(rating);
            }

            if (search) {
                conditions.push('f.title LIKE ?');
                parameters.push(`%${search}%`);
            }

            if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');

            if (sort && sortableColumns.includes(sort)) {
                query += ` ORDER BY ${sort} ${order === 'desc' ? 'DESC' : 'ASC'}`;
            }

            pool.query(query, parameters, (err, res) => {
                if (err) return callback(err, null);
                return callback(undefined, res);
            });
        }
        
        else {
            pool.query(`SELECT f.*, a.first_name, a.last_name, c.name AS category  
                        FROM film f 
                        JOIN film_actor fa ON f.film_id = fa.film_id 
                        JOIN actor a ON fa.actor_id = a.actor_id 
                        JOIN film_category fc ON f.film_id = fc.film_id
                        JOIN category c ON fc.category_id = c.category_id 
                        WHERE f.film_id = ${movieId};`, (err, res) => {
                if (err) {
                    return callback(err, null)
                }

                return callback(null, res)
            })
        }
    }
}

module.exports = moviesDao