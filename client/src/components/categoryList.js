import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../utils/api';

export default function CatgeoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/categories')
            .then((response) => setCategories(response.data))
            .catch((error) => {
                console.error('Error Fetching Categories!', error);
                setError('Failed to fetch categories.');
            });
    }, []);

    const handleCategoryDelete = (categoryId) => {
        api.delete(`/categories/${categoryId}`)
            .then(() => {
                alert('Category Removed');
                setCategories(categories.filter((category) => category.id !== categoryId));
            })
            .catch((error) => {
                console.error('Error Deleting Category!', error);
                setError('Failed to delete Category. Please try again.');
            });
        }

    return (
        <div className='category-list'>
             <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.category_name}
                        <button className='button' onClick={() => handleCategoryDelete(category.id)}>Delete</button>
                        <Link id="edit-btn" to={`/categories/${category.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}