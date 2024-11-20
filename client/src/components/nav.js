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
            <div>
            <nav>
                <Link to='/' id="home-link">Home</Link>
                <ul className='home-nav'>
                    {loggedIn ? (
                        <>
                            <li><Link className='nav-link' to="/categories">Categories</Link></li>
                            <li><Link className='nav-link' to="/tags">Tags</Link></li>
                            <li><Link className='nav-link' to="/products">Products</Link></li>
                            <li><Link className='nav-link' to="/profile">Profile</Link></li>
                            <button id='logout' onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <li><Link className='nav-link' to="/signup">Sign Up</Link></li>
                            <li><Link className='nav-link' to="/login">Login</Link></li>
                        </>
                    )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
