import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../utils/api';
import CategoryForm from './categoryForm';

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
        <div>
        <div className='category-list'>
             <ul className='categories'>
                {categories.map((category) => (
                    <li key={category.id}>
                        <p id='category-name'>{category.category_name}</p>
                        <button id='category-button' className='button' onClick={() => handleCategoryDelete(category.id)}><i className="bi bi-trash3"></i></button>
                        <div className='edit-list'>
                        <Link id="edit-btn" to={`/categories/${category.id}`}><i className="bi bi-pencil-square"></i></Link>
                    </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className='categoryForm-container'>
            <div className='catForm-area'>
        <CategoryForm />
        </div>
        </div>
        </div>
    );
}