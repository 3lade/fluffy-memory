// interface Product {
//     productId: string,
//     name: string,
//     price: string
// }

// interface CartItem {
//     productId: string,
//     name: string,
//     quantity: number
// }

// let products: Product[] = [
//     {productId: '1', name: 'Product 1', price: '$10.00'},
//     {productId: '2', name: 'Product 2', price: '$20.00'},
//     {productId: '3', name: 'Product 3', price: '$30.00'},
// ];

// let cart: CartItem[] = [];

// const productContainer = document.getElementById('productContainer') as HTMLDivElement;
// const cartList = document.getElementById('cartList') as HTMLUListElement;

// products.forEach(product => {
//     const productDiv = document.createElement('div');
//     productDiv.textContent = `${product.name} - ${product.price}`;
//     productDiv.className = "product"

//     const addBtn = document.createElement('button');
//     addBtn.textContent = "Add to Cart";
//     addBtn.addEventListener('click', () => {
//         addToCart(product);
//     })
//     productDiv.appendChild(addBtn);
//     productContainer.appendChild(productDiv);
// })


// const addToCart = (product: Product) => {
//     const existingItem = cart.find(item => item.productId === product.productId);
//     if(existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({ productId: product.productId, name: product.name, quantity: 1 })
//     }
//     renderCart();
// }

// const removeFromCart = (productId: string) => {
//     const item = cart.find(cart => cart.productId == productId);
//     if (item) {
//         item.quantity -= 1;
//         if(item.quantity <= 0) {
//             const index = cart.indexOf(item);
//             cart.splice(index, 1)
//         }
//         renderCart();
//     }
// }

// const renderCart = () => {
//     cartList.innerHTML = "";
//     cart.forEach(item => {
//         const li = document.createElement('li');
//         li.textContent = `${item.name} x ${item.quantity}`;

//         const removeBtn = document.createElement('button');
//         removeBtn.textContent = 'Remove';
//         removeBtn.addEventListener('click', () => {
//             removeFromCart(item.productId);
//         })

//         li.appendChild(removeBtn);
//         cartList.appendChild(li);
//     })
// }

