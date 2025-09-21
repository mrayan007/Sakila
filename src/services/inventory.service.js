const inventoryDao = require('../daos/inventory.dao');

const inventoryService = {
    get: (filmId, callback) => {
        inventoryDao.get(filmId, (error, inventory) => {
            if (error) return callback(error, null);
            if (inventory.length === 0) return callback(null, null);
            return callback(null, inventory[0]);
        });
    }
}

module.exports = inventoryService;