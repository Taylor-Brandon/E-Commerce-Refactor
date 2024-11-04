import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import ProductForm from './components/productForm';
import SearchProducts from './components/searchProducts';
import Category from './pages/category';
import Tag from './pages/tag';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Product />} />
                <Route path="/productForm" element={<ProductForm />} />
                <Route path="/searchProduct" element={<SearchProducts />} />
                <Route path="/categories" element={<Category />} />
                <Route path="/tags" element={<Tag />} />
            </Routes>
        </Router>
    );
}
