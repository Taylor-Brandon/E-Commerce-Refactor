import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/productList';
import SearchProducts from '../components/searchProducts';

export default function Product() { 
    return (
        <div>
            <ProductList />
            <Link to='/productForm'>Add</Link>
            <SearchProducts />
        </div>
    );
}