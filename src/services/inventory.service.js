const inventoryDao = require('../daos/inventory.dao');

const inventoryService = {
    get: (filmId, callback) => {
        inventoryDao.get(filmId, (error, inventory) => {
            if (error) return callback(error, null);
            if (inventory.length === 0) return callback(null, null);

            let totalInventory = 0;

            inventory.forEach(i => {
                totalInventory += i.inventory_count;
            });

            const data = {stores: inventory, total: totalInventory};
            return callback(null, data);
        });
    }
}

module.exports = inventoryService;