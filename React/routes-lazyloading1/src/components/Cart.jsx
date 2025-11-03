import React, { useEffect, useState } from 'react'

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(storedCart)
    }, [])

    const totalPrice = cart.reduce((sum, curr) => sum + curr.price, 0)
    
    const handleClear = () => {
      setCart([]);
      localStorage.setItem('cart', JSON.stringify([]));
    }
    
    const handleConfirmOrder = () => {

    }

  return (
    <div>
      <h2>Your Cart</h2>
      {
        cart.map((product) => (
          <p>{product.name} = ${product.price}</p>
        ))
      }
      <h4 style={{fontSize: '1rem'}}>Total: ${totalPrice}</h4>
      <button onClick={handleConfirmOrder}>Confirm Order</button>
      <button onClick={handleClear}>Clear Cart</button>
    </div>
  )
}

export default Cart