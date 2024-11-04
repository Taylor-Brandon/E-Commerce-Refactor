import React, { useState } from 'react';
import api from '../utils/api';

export default function ProductForm() {
    const [formState, setFormState] = useState({
        product_name: '',
        price: '',
        stock: '',
        category_id: '',
        tagIds: '',
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        api.post('/products', formState)
            .then((response) => {
                alert('Product Added Successfully!');
                setFormState({
                    product_name: '',
                    price: '',
                    stock: '',
                    category_id: '',
                    tagIds: '',
                }); 
            })
            .catch((error) => {
                console.error('Error Adding Product!', error);
                setError('Failed to add product. Please try again.');
            });
    };

    return (
        <div>
            <h2>Add a product</h2>
            <form className='form' onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label'>Product Name</label>
                    <div className='form-control'>
                        <input
                            className='input'
                            value={formState.product_name}
                            name="product_name"
                            type="text"
                            onChange={handleInputChange}
                            placeholder="Product Name"
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Price</label>
                    <div className='form-control'>
                        <input
                            className='input'
                            value={formState.price}
                            name="price"
                            type="number"
                            onChange={handleInputChange}
                            placeholder="Price"
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Stock</label>
                    <div className='form-control'>
                        <input
                            className='input'
                            value={formState.stock}
                            name="stock"
                            type="number"
                            onChange={handleInputChange}
                            placeholder="Stock"
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Category Id</label>
                    <div className='form-control'>
                        <input
                            className='input'
                            value={formState.category_id}
                            name="category_id"
                            type="number"
                            onChange={handleInputChange}
                            placeholder="Category Id"
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Tag Id</label>
                    <div className='form-control'>
                        <input
                            className='input'
                            value={formState.tagIds}
                            name="tagIds"
                            type="number"
                            onChange={handleInputChange}
                            placeholder="Tag Id"
                        />
                    </div>
                </div>
                <button className='button' type='submit'>Add</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
