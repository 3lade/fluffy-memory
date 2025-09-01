const fs = require('fs');
const path = require('path');
const { Readable} = require('stream');

class FoodDelivery {
    constructor()
    {
        this.orders = [];
        this.items = [{ name: 'Burger', price: 5 },
                        { name: 'Fries', price: 3 }];
        this.totalCost = 0;
    }

    addOrder(order)
    {
        this.orders.push(order);
    }

    calculateTotalCost(orderId)
    {
        const found = this.orders.find(item => item.orderId === orderId);
        if(!found)
        {
            throw new Error('Order not found');
        }

        this.totalCost = found.items.reduce((acc, curr) => acc + curr.price, 0);
        return this.totalCost;
    }

    streamOrderDetails(orderId, filePath)
    {
        const found = this.orders.find(item => item.orderId === orderId)
        {
            if(!found)
            {
                throw new Error('Order not found');
            }
        }
        const ReadableStream = Readable.from(JSON.stringify(found));
        const Writable = fs.createWriteStream(filePath);
        ReadableStream.pipe(Writable);
    }

    retrieveOrderDetails(filePath, callback)
    {
        let data = '';
        const stream = fs.createReadStream(filePath, {encoding: 'utf8'});

        stream.on('data', chunk => {
            data += chunk;
        });

        stream.on('end', ()=> {
            try {
                const parsed = JSON.parse(data);
                callback(null, parsed);
            } catch (err) {
                callback(err);
            }
        });
        stream.on('error', err => {
            callback(err);
        })

    }

    clearOrders()
    {
        this.orders=[];
    }
}

module.exports = FoodDelivery;