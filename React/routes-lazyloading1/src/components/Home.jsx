import React, { useEffect, useState } from 'react'
import productsData from './productsData'

function Home() {

    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
        setIsLoading(true)
    }, [])

    useEffect(() => {
        if(isLoading)
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart, isLoading])

    const handleAddToCard = (product) => {
        setCart(prevCart => [...prevCart, product])
    }

  return (
    <div>
        <h2>Electro - Products</h2>
        <div style={styles.gridView}>
            {
                productsData.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                        <button onClick={() => handleAddToCard(product)}>Add to Cart</button>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

const styles = {
    gridView: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 20
    },
    card: {
        boxShadow: '0 0 4px #ddd',
        padding: 10,
        textAlign: 'center'
    }
}

export default Home