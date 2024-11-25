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
            <div className='field mt-4 ml-3 mr-3'>
                <div className='label has-text-white ml-2 is-size-4'>Tag Name</div>
                <input
                id='tag-input'
                className='input has-background-white has-text-black'
                onChange={handleInputChange}
                type="text"
                name="tag_name"
                value={formState.tag_name}
                />
            </div>
            <button id='tag-btn' className='button' type="submit">Add</button>
        </form>
    );
}