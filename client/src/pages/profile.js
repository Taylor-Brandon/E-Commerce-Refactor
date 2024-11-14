import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/nav';
import api from '../utils/api';

export default function Profile() {
    const [userData, setUserData] = useState({}); 
    const [userEmail, setUserEmail] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('User-Data')) || {};
        setUserData(storedItems);
        setUserEmail(storedItems.email);
    }, []);  

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    const handleUserDelete = (e) => {
        e.preventDefault();
        setShowConfirm(false);
        api.delete(`/users/${userEmail}`)
        .then(() => {
            alert('User removed');
            window.location.href = '/signup'; 
        })
        .catch((err) => {
            console.error(err);
        });
    };

    const handleConfirmToggle = () => {
        setShowConfirm(!showConfirm);
    }

    return (
        <div>
            <Nav />
        <div className='profile-area'>
            <div className='profile-card'>
            <h1 id='profile-header'>{userData.username}</h1>
            <p id='updateProfile-link'><Link to='/updateUser'>Update Your Profile</Link></p>
            <button id='delete-account' onClick={handleConfirmToggle}>Delete Your Account</button>
            </div>
            {showConfirm && (
                <div className='modal is-active'>
                    <div class="modal-background"></div>
                    <div className='modal-card'>
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are you sure you would like to delete your account?</p>
                        </header>
                        <section class="modal-card-body">
                        <button onClick={handleUserDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                        </section>
                    </div>
                    </div>
            )}
        </div>
        </div>
    );
}
