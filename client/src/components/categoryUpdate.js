import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';


export default function CategoryUpdate() {
    const { categoryId } = useParams();
    const [newCategory, setNewCategory] = useState({category_name: ''});
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/categories/${categoryId}`)
            .then((response) => {
                setNewCategory({
                    category_name: response.data.category_name,
                });
            })
            .catch((error) => {
                console.error('Error finding category!', error);
                setError('Failed to find category. Please try again.');
            });
    }, [categoryId]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({
            ...newCategory,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        api.put(`/categories/${categoryId}`, newCategory)
            .then(() => {
                alert('Category Updated Successfully!');
            })
            .catch((error) => {
                console.error('Error updating category!', error);
                setError('Failed to update category. Please try again.');
            });
    };
    return(
        <div className='form-area'>
        <h2>Update Category</h2>
        <form onSubmit={handleFormSubmit}>
            <div className='field'>
                <label className='label'>Category Name</label>
                <div className='control'>
                    <input
                        className='input'
                        type='text'
                        placeholder='Category Name'
                        name='category_name'
                        value={newCategory.category_name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className='button' type='submit'>Update</button>
        </form>
    </div>
    );
}