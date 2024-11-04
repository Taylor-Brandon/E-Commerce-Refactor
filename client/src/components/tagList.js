import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function TagList() {
    const [tag, setTag] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/tags')
            .then((response) => setTag(response.data))
            .catch((error) => {
                console.error('Error Fetching tag!', error);
                setError('Failed to fetch tag.');
            });
    }, []);

    const handleTagDelete = (tagId) => {
        api.delete(`/tags/${tagId}`)
            .then(() => {
                alert('Tag Removed');
                setTag(tag.filter((tag) => tag.id !== tagId));
            })
            .catch((error) => {
                console.error('Error Deleting Tag!', error);
                setError('Failed to delete Tag. Please try again.');
            });
        }

    return (
        <div className='tag-list'>
             <ul>
                {tag.map((tag) => (
                    <li key={tag.id}>
                        {tag.tag_name}
                        <button className='button' onClick={() => handleTagDelete(tag.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}