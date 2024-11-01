import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/products')
            .then((response) => setProducts(response.data))
            .catch((error) => {
                console.error('Error Fetching Products!', error);
                setError('Failed to fetch products.');
            });
    }, []);

    return (
        <div>
            <h2>Products</h2>
            {error && <p>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product_name}, ${product.price}, {product.category.category_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


