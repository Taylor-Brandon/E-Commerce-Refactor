import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Profile() {
    const [userData, setUserData] = useState({}); 
    const [userEmail, setUserEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('User-Data')) || {};
        setUserData(storedItems);
        setUserEmail(storedItems.email);
    }, []);  

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const handleUserDelete = (e) => {
        e.preventDefault();
        setShowModal(false);
        api.delete(`/users/${userEmail}`)
        .then(() => {
            alert('User removed');
        })
        .catch((err) => {
            console.error(err);
        });
    };

    return (
        <div>
            <h1>{userData.username}</h1>
            <Link to='/updateUser'>Update Your Profile</Link>
            <button onClick={() => setShowModal(true)}>Delete Your Account</button>
            {showModal && (
                <div className='modal'>
                    <div className='content'>
                        <p>Are you sure you would like to delete your account?</p>
                        <button onClick={handleUserDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}
