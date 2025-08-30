const EventEmitter = require("events");

class InventoryManager extends EventEmitter {
    constructor() {
        super();
        this.inventory = {};
    }

    addItem(item, quantity) {
        // const exist = this.inventory.find(item => item.quantity === quantity)
        if (this.inventory[item]) {
            this.inventory[item] +=quantity;
        }
        else {
            // exist.quantity = quantity;
            this.inventory[item] =quantity;
            
        }
        this.emit("itemAdded", item, quantity)
    }

    removeItem(item, quantity) {
        // const exist = this.inventory.find(item => item.quantity === quantity)

        if(!this.inventory[item]) return;

        if (this.inventory[item] >= quantity) {
            this.inventory[item] -= quantity;
            this.emit("itemRemoved", item, quantity)
            if(this.inventory[item] === 0) {
                this.emit("itemOutOfStock", item);
            }
        } 
    }

    getInventory() {
        return this.inventory;
    }
}

module.exports=InventoryManager;