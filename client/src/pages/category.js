import React from 'react';
import { Link } from 'react-router-dom';
import CategoryList from '../components/categoryList';
import Nav from '../components/nav';


export default function Category() {
    return (
        <div>
            <Nav />
        <CategoryList />
        </div>
    );
}