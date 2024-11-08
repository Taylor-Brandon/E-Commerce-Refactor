import React, { useState } from 'react';
import api from '../utils/api';

export default function Login() {
    const [error, setError] = useState('');
    const [formState, setFormState] = useState({
        email: '', 
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        api.post('/users/login', formState)
        .then((response) => {
            alert('Logged In');
            localStorage.setItem('User-Data', JSON.stringify(formState));
            console.log(response);
        })
        .catch((err) => {
            console.error('Error logging in User!', err);
            setError('Failed to login user. Please try again.');
        });
    };

    return (
        <div className='login-area'>
            <form onSubmit={handleFormSubmit}>
                {error && <div className="error-message">{error}</div>} 
                
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
                            type='password'
                        />
                    </div>
                </div>

                <button className='button' type='submit'>Login</button>
            </form>
        </div>
    );
}
