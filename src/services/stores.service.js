const storesDao = require('../daos/stores.dao');

const storesService = {
    getAll: (callback) => {
        storesDao.get((error, stores) => {
            if (error) return callback(null);
            return callback(stores);
        });
    }
}

module.exports = storesService;