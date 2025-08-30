global.MenuItem = class MenuItem{
    constructor(name, price)
    {
        this.name = name;
        this.price = price;
    }
}

global.Order = class Order{
    constructor()
    {
        this.items = [];
    }

    addItem(menuItem)
    {
        this.items.push(menuItem);
    }

    calculateTotal()
    {
        return this.items.reduce((acc, curr) => acc + curr.price, 0);
    }

    printOrderDetails()
    {
        console.log('--- Order Summary ---');
        this.items.forEach((item) =>
        {
            console.log(`${item.name}: ${item.price}`)
        })
        console.log(`Total: ${this.calculateTotal()}`)
    }
}

module.exports={
    MenuItem,
    Order
}