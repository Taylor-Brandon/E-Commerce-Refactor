import React from 'react';
import { Link } from 'react-router-dom';
import TagList from '../components/tagList';
import Nav from '../components/nav'


export default function Tag() {
    return (
        <div>
            <Nav />
        <TagList />
        </div>
    );
}