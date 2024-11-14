import React, {useState} from 'react';
import api from '../utils/api';

export default function Signup() {
    const [error, setError] = useState('');
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [signedIn, setSignedIn] = useState(false);

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
            setSignedIn(true);
            alert('Successfully Signed up!');
            localStorage.setItem('User-Data', JSON.stringify(formState));
            localStorage.setItem('LoggedIn', JSON.stringify(true));
            window.location.href = '/'; 
            console.log(response);
        })
        .catch((err) => {
            console.error('Error Adding User!', error);
            setError('Failed to add user. Please try again.');
        });
    }
    return (
        <div className='signForm-area'>
            <form className="signup-form" onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label has-text-black is-size-5'>Username</label>
                    <div className='control'>
                        <input
                        className='input'
                        name='username'
                        value={formState.username}
                        onChange={handleInputChange}
                        type='text'
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-5'>Email</label>
                    <div className='control'>
                        <input
                        className='input'
                        name='email'
                        value={formState.email}
                        onChange={handleInputChange}
                        type='text'
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-5'>Password</label>
                    <div className='control'>
                        <input
                        className='input'
                        name='password'
                        value={formState.password}
                        onChange={handleInputChange}
                        type='text'
                        />
                    </div>
                </div>
                <button id='sign-btn' className='button' type='submit'>Sign Up</button>
            </form>
        </div>
    );
}