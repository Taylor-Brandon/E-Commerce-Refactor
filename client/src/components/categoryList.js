import React, { useState, useEffect } from 'react';
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

    return (
        <div className='category-list'>
             <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        {category.category_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}