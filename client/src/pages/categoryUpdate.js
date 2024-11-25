import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/nav';
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
        <div>
            <Nav />
            <h2 id='catUpdate-header'>Update Category</h2>
        <div className='catUpdate-area'>
        <form className='catUpdate-form' onSubmit={handleFormSubmit}>
            <div className='field'>
                <label id='catUpdate-label' className='label has-text-black'>Category Name</label>
                <div className='control'>
                    <input
                        id='updateCat-input'
                        className='input has-background-white has-text-black'
                        type='text'
                        name='category_name'
                        value={newCategory.category_name}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button id='catUpdate-btn' className='button' type='submit'>Update</button>
        </form>
    </div>
    </div>
    );
}