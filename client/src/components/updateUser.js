import React, {useState, useEffect} from 'react';
import api from '../utils/api';

export default function UpdateUser() {
    const [userData, setUserData] = useState({});
    const [userEmail, setUserEmail] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('User-Data')) || {};
        setUserData(storedItems);
        setUserEmail(storedItems.email);
        setFormState({
            username: userData.username,
            email: userData.email,
            password: userData.password
        });
    }, []);

    const handleInputChange = (e) => {
       const {name, value} = e.target;

       setFormState({
        ...formState,
        [name]: value,
       });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        localStorage.clear();
        api.put(`/users/${userEmail}`)
        .then(() => {
            localStorage.setItem('User-Data', JSON.stringify(formState));
            window.location.href = '/profile';
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className='form-area'>
        <form onSubmit={handleFormSubmit}>
            <div className='field'>
                <label className='label'>Username</label>
                <div className='control'>
                    <input
                    className='input'
                    placeholder='Username'
                    name='username'
                    value={formState.username}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Email</label>
                <div className='control'>
                    <input
                    className='input'
                    placeholder='Email'
                    name='email'
                    value={formState.email}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label'>Password</label>
                <div className='control'>
                    <input
                    className='input'
                    placeholder='Password'
                    name='password'
                    value={formState.password}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <button className='button' type='submit'>Update</button>
        </form>
    </div>
    );
}