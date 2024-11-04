import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function TagList() {
    const [tag, setTag] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/tag')
            .then((response) => setTag(response.data))
            .catch((error) => {
                console.error('Error Fetching tag!', error);
                setError('Failed to fetch tag.');
            });
    }, []);

    return (
        <div className='tag-list'>
             <ul>
                {tag.map((tag) => (
                    <li key={tag.id}>
                        {tag.tag_name}
                    </li>
                ))}
            </ul>
        </div>
    );
}