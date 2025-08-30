const { EventEmitter } = require("events");

class OrderProcessor extends EventEmitter
{
    constructor()
    {
        super();
        this.orders=[];
    }

    placeOrder(orderId)
    {
        const order = { id : orderId, status: 'placed'};
        this.orders.push(order);
        this.emit('orderPlaced', orderId);
    }

    shipOrder(orderId)
    {
        const key = this.orders.find(item => item.id === orderId);
        if(key  && key.status === 'placed')
        {
            key.status='shipped'
            this.emit('orderShipped', orderId)
        }
    }

    deliverOrder(orderId)
    {
        const keys = this.orders.find(item => item.id === orderId);
        if(keys && keys.status === 'shipped')
        {
            keys.status='delivered'
            this.emit('orderDelivered', orderId)
        }
    }
}

module.exports=OrderProcessor;