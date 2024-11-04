import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProductList() {
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

    const handleProductDelete = (productId) => {
        api.delete(`/products/${productId}`)
            .then(() => {
                alert('Product Removed');
                setProducts(products.filter((product) => product.id !== productId));
            })
            .catch((error) => {
                console.error('Error Deleting Product!', error);
                setError('Failed to delete product. Please try again.');
            });
    };

    return (
        <div>
            <h2>Products</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product_name}, ${product.price}, {product.category?.category_name}
                        <button 
                            className='button' 
                            onClick={() => handleProductDelete(product.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
