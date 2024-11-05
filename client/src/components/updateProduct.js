import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

export default function UpdateProduct() {
    const { productId } = useParams();
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        price: '',
        stock: '',
        category_id: '',
        tagIds: [],
    });
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/products/${productId}`)
            .then((response) => {
                
                setNewProduct({
                    product_name: response.data.product_name,
                    price: response.data.price,
                    stock: response.data.stock,
                    category_id: response.data.category_id,
                    tagIds: response.data.tagIds || [],
                });
            })
            .catch((error) => {
                console.error('Error finding product!', error);
                setError('Failed to find product. Please try again.');
            });
    }, [productId]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === "price" || name === "stock" || name === "category_id" || name === "tagIds")
            ? parseInt(value) || '' 
            : value;

        setNewProduct({
            ...newProduct,
            [name]: newValue,
        });
    };
    const handleTagChange = (e) => {
        const selectedTagIds = Array.from(e.target.selectedOptions, option => option.value);
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            tagIds: selectedTagIds,
        }));
    };


    const handleFormSubmit = (e) => {
        e.preventDefault();

        api.put(`/products/${productId}`, newProduct)
            .then(() => {
                alert('Product Updated Successfully!');
            })
            .catch((error) => {
                console.error('Error updating product!', error);
                setError('Failed to update product. Please try again.');
            });
    };

    return (
        <div className='form-area'>
            <h2>Update product</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label'>Product Name</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='text'
                            placeholder='Product Name'
                            name='product_name'
                            value={newProduct.product_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Price</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='number'
                            placeholder='Price'
                            name='price'
                            value={newProduct.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Stock</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='number'
                            placeholder='Stock'
                            name='stock'
                            value={newProduct.stock}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Category Id</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='number'
                            placeholder='Category Id'
                            name='category_id'
                            value={newProduct.category_id}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Tag Ids</label>
                    <div className='control'>
                        <select
                            className='input'
                            name='tagIds'
                            multiple 
                            value={newProduct.tagIds} 
                            onChange={handleTagChange}
                        >
                            
                            <option value="1">Tag 1</option>
                            <option value="2">Tag 2</option>
                            <option value="3">Tag 3</option>
                        </select>
                    </div>
                </div>
                <button className='button' type='submit'>Update</button>
            </form>
        </div>
    );
}
