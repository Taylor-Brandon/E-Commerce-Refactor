import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import ProductList from './components/productForm';
import ProductForm from './components/productForm';
import SearchProducts from './components/searchProducts';
import CatgeoryList from './components/categoryList';
import TagList from './components/tagList';


export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Product />} />
                <Route path="/productForm" element={<ProductForm />} />
                <Route path="/searchProduct" element={<SearchProducts />} />
                <Route path="/categories" element={<CatgeoryList />} />
                <Route path="/tags" element={<TagList />} />
            </Routes>
        </Router>
    );
}
