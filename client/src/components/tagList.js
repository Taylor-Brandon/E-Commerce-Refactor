import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TagForm from './tagForm';
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
        <div>
        <div className='tag-list'>
             <ul className='tag-items'>
                {tag.map((tag) => (
                    <li id='tag-lines' key={tag.id}>
                       <p id='tag-name'>{tag.tag_name}</p>
                        <button id='tag-del' className='button' onClick={() => handleTagDelete(tag.id)}><i className="bi bi-trash3"></i></button>
                        <div className='tagEdit-area'>
                        <Link id="tagEdit-btn" to={`/tags/${tag.id}`}><i className="bi bi-pencil-square"></i></Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        <div className='tag-area'>
        <div className='tag-form'>
            <TagForm />
        </div>
        </div>
        </div>
    );
}