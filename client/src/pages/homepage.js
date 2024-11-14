import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Nav from '../components/nav';
import Img from '../image/header.jpg';

export default function Homepage() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
       
        const storedStatus = JSON.parse(localStorage.getItem('LoggedIn')) || false;
        setLoggedIn(storedStatus);

       
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
                localStorage.removeItem('LoggedIn'); 
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Nav />
            {loggedIn ? (
                <div>
                    <div className='info-section'>
                        <div className='text-area'>
                        <div className='paragraph-section'>
                            <h2 id='info-header'>About Us</h2>
                            <p id='info-par'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className='btn-area'>
                            <Link id='shop' to='products'>Explore</Link>
                            </div>
                            </div>
                            </div>
                            <div className='img-section'>
                                <img id='img' src={Img} alt="Info-Img"></img>
                                </div>
                        </div>
                        <div className='home-main'>
                        <div className='product-section'>
                    <ul>
                        {products.map((product) => (
                            <li className='home-product' key={product.id}>
                                <div className='productImg-area'>
                                    <a id='product-link' href={`/productInfo/${product.id}`}>
                                <img
                                    className='product-img'
                                    src={`http://localhost:3001${product.productImage}`}
                                    alt={product.product_name}
                                    style={{ width: '300px', height: '400px' }}
                                />
                                </a>
                                </div>
                                <p className='product-text'>{product.product_name}, ${product.price}, {product.category.category_name}</p>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
                </div>
            ) : (
                <h2 id='home-error'>Please log in to view products.</h2>
            )}
        </div>
    );
}





