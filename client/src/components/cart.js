import React, { useState, useEffect } from 'react';
import Checkout from './checkout';

export default function Cart({ added }) {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('added')) || [];
        setCartProducts(storedItems);
    }, []);

    const removeAdded = (productId) => {
        const updatedAdded = cartProducts.filter((add) => add.id !== productId);
        setCartProducts(updatedAdded);
        localStorage.setItem('added', JSON.stringify(updatedAdded));
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartProducts.map((product, index) => (
                    <li key={index}>
                        {product.product_name} - ${product.price} x {product.quantity} 
                        <button className="button" onClick={() => removeAdded(product.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <Checkout cartProducts={cartProducts} />
        </div>
    );
}
