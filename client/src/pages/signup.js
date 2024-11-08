import React, {useState} from 'react';
import api from '../utils/api';

export default function Signup() {
    const [error, setError] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        api.post('/users/signup', formState)
        .then((response) => {
            alert('Successfully Signed up!');
            localStorage.setItem('User-Data', JSON.stringify(formState));
            console.log(response);
        })
        .catch((err) => {
            console.error('Error Adding User!', error);
            setError('Failed to add user. Please try again.');
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
                <button className='button' type='submit'>Sign Up</button>
            </form>
        </div>
    );
}