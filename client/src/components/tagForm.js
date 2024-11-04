import React, { useState } from 'react';
import api from '../utils/api';

export default function TagForm() {
    const [formState, setFormState] = useState({tag_name: ''});
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        api.post('/tags', formState)
            .then((response) => {
                alert('Tag Added Successfully!');
                setFormState({
                    tag_name: ''
                }); 
            })
            .catch((error) => {
                console.error('Error Adding Tag!', error);
                setError('Failed to add tag. Please try again.');
            });
    }

    return (
        <form className='form' onSubmit={handleFormSubmit}>
            <div className='field'>
                <div className='label'>Tag Name</div>
                <input
                className='input'
                onChange={handleInputChange}
                type="text"
                name="tag_name"
                value={formState.tag_name}
                />
            </div>
            <button className='button' type="submit">Add</button>
        </form>
    );
}