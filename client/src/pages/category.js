import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/categoryList';


export default function Category() {
    return (
        <div>
        <CategoryList />
        <Link to="/categoryForm">Add</Link>
        </div>
    );
}