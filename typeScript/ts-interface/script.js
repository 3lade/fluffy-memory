var products = [
    { productId: '1', name: 'Product 1', price: '$10.00' },
    { productId: '2', name: 'Product 2', price: '$20.00' },
    { productId: '3', name: 'Product 3', price: '$30.00' },
];
var cart = [];
var productContainer = document.getElementById('productContainer');
var cartList = document.getElementById('cartList');
products.forEach(function (product) {
    var productDiv = document.createElement('div');
    productDiv.textContent = "".concat(product.name, " - ").concat(product.price);
    productDiv.className = "product";
    var addBtn = document.createElement('button');
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener('click', function () {
        addToCart(product);
    });
    productDiv.appendChild(addBtn);
    productContainer.appendChild(productDiv);
});
var addToCart = function (product) {
    var existingItem = cart.find(function (item) { return item.productId === product.productId; });
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cart.push({ productId: product.productId, name: product.name, quantity: 1 });
    }
    renderCart();
};
var removeFromCart = function (productId) {
    var item = cart.find(function (cart) { return cart.productId == productId; });
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            var index = cart.indexOf(item);
            cart.splice(index, 1);
        }
        renderCart();
    }
};
var renderCart = function () {
    cartList.innerHTML = "";
    cart.forEach(function (item) {
        var li = document.createElement('li');
        li.textContent = "".concat(item.name, " x ").concat(item.quantity);
        var removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
            removeFromCart(item.productId);
        });
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
};
