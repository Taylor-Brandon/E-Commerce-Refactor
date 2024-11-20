import React, { useState } from 'react';
import api from '../utils/api';
import Nav from './nav';

export default function ProductForm() {
    const [formState, setFormState] = useState({
        product_name: '',
        price: '',
        stock: '',
        productImage: '',
        category_id: '',
        tagIds: '',
        description: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === "price" || name === "stock" || name === "category_id" || name === "tagIds")
            ? parseInt(value) || '' 
            : value;
        setFormState({
            ...formState,
            [name]: newValue,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormState({
            ...formState,
            productImage: file,  
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        api.post('/products', formState)
            .then((response) => {
                alert('Product Added Successfully!');
                setFormState({
                    product_name: '',
                    price: '',
                    stock: '',
                    productImage: '',
                    category_id: '',
                    tagIds: '',
                    description: '',
                }); 
            })
            .catch((error) => {
                console.error('Error Adding Product!', error);
                setError('Failed to add product. Please try again.');
            });
    };

    return (
        <div>
        <Nav />
        <div className='productForm-area'>
            <div className='productForm'>
            <form className='form' onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Product Name</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.product_name}
                            name="product_name"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Price</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.price}
                            name="price"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Stock</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.stock}
                            name="stock"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Product Images</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            name="productImage"
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Category Id</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.category_id}
                            name="category_id"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Tag Id</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.tagIds}
                            name="tagIds"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black is-size-4'>Description</label>
                    <div className='form-control'>
                        <input
                            className='input has-background-white has-text-black'
                            value={formState.description}
                            name="description"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>
                    </div>
                <button id='productAdd-btn' className='button mt-3' type='submit'>Add</button>
            </form>
            </div>
        </div>
        </div>
    );
}
