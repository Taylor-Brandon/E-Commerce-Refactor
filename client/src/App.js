import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Product from './pages/product';
import ProductForm from './components/productForm';
import SearchProducts from './components/searchProducts';
import Category from './pages/category';
import Tag from './pages/tag';
import CategoryForm from './components/categoryForm';
import TagForm from './components/tagForm';
import UpdateProduct from './components/updateProduct';
import TagUpdate from './components/tagUpdate';
import CategoryUpdate from './components/categoryUpdate';
import Signup from './pages/signup';
import Login from './pages/login';
import Profile from './pages/profile';
import UpdateUser from './components/updateUser';


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
                <Route path="/categoryForm" element={<CategoryForm />} />
                <Route path="/tagForm" element={<TagForm />} />
                <Route path="/products/:productId" element={<UpdateProduct />} />
                <Route path="/tags/:tagId" element={<TagUpdate />} />
                <Route path="/categories/:categoryId" element={<CategoryUpdate />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateUser" element={<UpdateUser />} />
            </Routes>
        </Router>
    );
}
