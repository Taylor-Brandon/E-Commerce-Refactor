import React from 'react';
import { Link } from 'react-router-dom';
import TagList from '../components/tagList';


export default function Tag() {
    return (
        <div>
        <TagList />
        <Link to="/tagForm">Add</Link>
        </div>
    );
}