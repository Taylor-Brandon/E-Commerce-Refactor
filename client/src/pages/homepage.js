import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Checkout from '../components/checkout';

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

    const handleLogout = (e) => {
        e.preventDefault();
        api.post('/users/logout')
        .then(() => {
            alert('Goodbye!');
            window.location.href = '/login';
            localStorage.clear();
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/categories">Catgeories</Link></li>
                    <li><Link to="/tags">Tags</Link></li>
                    <li><Link to="/products">Products</Link></li>
                </ul>
                <ul>
                    <li>
                        <Link to='/signup'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h2>Products</h2>
            {error && <p>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product_name}, ${product.price}, {product.category.category_name}
                    </li>
                ))}
            </ul>
            <Checkout/>
        </div>
    );
}




