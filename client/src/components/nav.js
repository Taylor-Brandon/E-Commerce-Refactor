import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const storedStatus = JSON.parse(localStorage.getItem('LoggedIn')) || false;
        setLoggedIn(storedStatus);

    }, {});

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
            <div className='nav-area'>
            <nav>
                <Link to='/' id="home-link">Home</Link>
                <ul className='home-nav'>
                    {loggedIn ? (
                        <>
                            <li><Link id='category' to="/categories">Categories</Link></li>
                            <li><Link id='tag' to="/tags">Tags</Link></li>
                            <li><Link id='product' to="/products">Products</Link></li>
                            <li><Link id='profile' to="/profile">Profile</Link></li>
                            <button id='logout' onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <li><Link id='signup' to="/signup">Sign Up</Link></li>
                            <li><Link id='login' to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            </div>
        </div>
    );
}
