import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function TagUpdate() {
    const { tagId } = useParams();
    const [newTag, setNewTag] = useState({tag_name: ''});
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/tags/${tagId}`)
            .then((response) => {
                setNewTag({
                    tag_name: response.data.tag_name,
                });
            })
            .catch((error) => {
                console.error('Error finding tag!', error);
                setError('Failed to find tag. Please try again.');
            });
    }, [tagId]); 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTag({
            ...newTag,
            [name]: value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        api.put(`/tags/${tagId}`, newTag)
            .then(() => {
                alert('Tag Updated Successfully!');
            })
            .catch((error) => {
                console.error('Error updating tag!', error);
                setError('Failed to update tag. Please try again.');
            });
    };
    return(
        <div className='form-area'>
            <h2>Update tag</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label'>Tag Name</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='text'
                            placeholder='Tag Name'
                            name='tag_name'
                            value={newTag.tag_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className='button' type='submit'>Update</button>
            </form>
        </div>
    );
}