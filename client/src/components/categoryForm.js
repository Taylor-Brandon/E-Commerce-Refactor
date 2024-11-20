import React, { useState } from 'react';
import api from '../utils/api';

export default function CategoryForm() {
    const [formState, setFormState] = useState({category_name: ''});
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
        api.post('/categories', formState)
            .then((response) => {
                alert('Category Added Successfully!');
                setFormState({
                    category_name: ''
                }); 
            })
            .catch((error) => {
                console.error('Error Adding Catgeory!', error);
                setError('Failed to add category. Please try again.');
            });
    }

    return (
        <div className='category-form'>
        <form className='form' onSubmit={handleFormSubmit}>
            <div className='field'>
                <div className='label is-size-4 has-text-white'>Category Name</div>
                <input
                id='cat-input'
                className='input has-background-white has-text-black'
                onChange={handleInputChange}
                type="text"
                name="category_name"
                value={formState.category_name}
                />
            </div>
            <button id='catForm-btn' className='button' type="submit">Add</button>
        </form>
        </div>
    );
}