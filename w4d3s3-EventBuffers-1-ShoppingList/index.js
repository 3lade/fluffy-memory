    class ShoppingList {
        constructor()
        {
            this.groceries = [];
            this.item = [
                {itemName: "Apples", price: 3.5},
                {itemName: "Bread", price: 2.0},
                {itemName: "Milk", price: 4.25}
            ];
            this.totalPrice=0;
        }

        addItem(itemName, price)
        {
            const item = {itemName: itemName, price: price}
            this.groceries.push(item)
        }

        calculateTotalPrice()
        {
            this.totalPrice = this.groceries.reduce((acc, curr) => acc + curr.price, 0);
        }

        removeItem(itemName)
        {
            const initLen = this.groceries.length;
            this.groceries = this.groceries.filter(item => item.itemName !== itemName);

            return this.groceries.length < initLen;
        }

        clearList()
        {
            this.groceries=[];
            this.totalPrice=0;
        }

        getItems()
        {
            return this.groceries;
        }

        getTotalPrice()
        {
            return this.totalPrice;
        }
    }

    module.exports=ShoppingList;