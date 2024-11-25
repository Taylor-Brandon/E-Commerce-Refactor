import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/nav';
import api from '../utils/api';

export default function UpdateProduct() {
    const { productId } = useParams();
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        price: '',
        stock: '',
        productImage: '',
        category_id: '',
        tagIds: [],
        description: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        api.get(`/products/${productId}`)
            .then((response) => {
                
                setNewProduct({
                    product_name: response.data.product_name,
                    price: response.data.price,
                    stock: response.data.stock,
                    productImage: response.data.productImage,
                    category_id: response.data.category_id,
                    tagIds: response.data.tagIds || [],
                    description: response.data.description,
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProduct({
            ...newProduct,
            productImage: file,  
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
        <div>
            <Nav />
             <h2 id='updateProduct-header'>Update product</h2>
             <div id='updateProduct-form'>
        <div className='form-area has-background-white'>
            <form onSubmit={handleFormSubmit}>
                <div className='field'>
                    <label className='label has-text-black'>Product Name</label>
                    <div className='control'>
                        <input
                            id='updateProductName-input'
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
                    <label className='label has-text-black'>Price</label>
                    <div className='control'>
                        <input
                            id='updatePrice-input'
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
                    <label className='label has-text-black'>Stock</label>
                    <div className='control'>
                        <input
                            id='updateStock-input'
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
                    <label className='label has-text-black'>Product Image</label>
                    <div className='control'>
                        <input
                            id='updateProductImage-input'
                            className='input'
                            type='file'
                            placeholder='Image'
                            name='productImage'
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
                <div className='field'>
                    <label className='label has-text-black'>Category Id</label>
                    <div className='control'>
                        <input
                            id='updateProductCat-input'
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
                    <label className='label has-text-black'>Tag Ids</label>
                    <div className='control'>
                        <select
                            id='updateProductTag-input'
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
                <div className='field'>
                    <label className='label has-text-black'>Description</label>
                    <div className='control'>
                        <input
                            id='updateDescription-input'
                            className='input'
                            type='type'
                            placeholder='description'
                            name='description'
                            value={newProduct.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button className='button' type='submit'>Update</button>
            </form>
            </div>
        </div>
        </div>
    );
}
