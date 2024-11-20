import React, { useState, useEffect } from 'react';
import Checkout from './checkout';

export default function Cart({ added, toggle }) {
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
        <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
        <div>
        <header class="modal-card-head">
        <h2 class="modal-card-title" id='cart-header'>Your Cart</h2>
            </header>
            <section class="modal-card-body">
            <ul>
                {cartProducts.map((product) => (
                    <li key={product.id}>
                       <a href={`/productInfo/${product.id}`}><p id='cart-product'>{product.product_name} X {product.quantity}</p></a>
                        <button id='cart-del' className="button" onClick={() => removeAdded(product.id)}>
                        <i className="bi bi-trash3"></i>
                        </button>
                    </li>
                ))}
            </ul>
            </section>
            <footer class="modal-card-foot">
            <Checkout cartProducts={cartProducts} />
            <button id='cancel-btn' class="button" onClick={toggle}>Cancel</button>
            </footer>
        </div>
        </div>
        </div>
    );
}


