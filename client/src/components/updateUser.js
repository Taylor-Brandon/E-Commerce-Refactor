import React, {useState, useEffect} from 'react';
import Nav from './nav';
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
        <div>
            <Nav />
            <div className='update-section'>
        <div className='form-area'>
        <form onSubmit={handleFormSubmit}>
            <div className='field'>
                <label className='label has-text-white is-size-4'>Username</label>
                <div className='control'>
                    <input
                    className='input has-background-white has-text-black'
                    placeholder='Username'
                    name='username'
                    value={formState.username}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label has-text-white is-size-4'>Email</label>
                <div className='control'>
                    <input
                    className='input has-background-white has-text-black'
                    placeholder='Email'
                    name='email'
                    value={formState.email}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <div className='field'>
                <label className='label has-text-white is-size-4'>Password</label>
                <div className='control'>
                    <input
                    className='input has-background-white has-text-black'
                    placeholder='Password'
                    name='password'
                    value={formState.password}
                    onChange={handleInputChange}
                    type='text'
                    />
                </div>
            </div>
            <button id='finalUpdate-btn' className='button' type='submit'>Update</button>
        </form>
    </div>
    </div>
    </div>
    );
}