import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Cart from './cart';
import api from '../utils/api';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [added, setAdded] = useState([]);
    const [error, setError] = useState('');

    
    useEffect(() => {
        api.get('/products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error Fetching Products!', error);
                setError('Failed to fetch products.');
            });

        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    const handleProductDelete = (productId) => {
        api.delete(`/products/${productId}`)
            .then(() => {
                alert('Product Removed');
                setProducts(products.filter((product) => product.id !== productId));
                removeFavorite(productId); 
            })
            .catch((error) => {
                console.error('Error Deleting Product!', error);
                setError('Failed to delete product. Please try again.');
            });
    };

    const handleFavoriteProduct = (product) => {
        const isFavorited = favorites.some(fav => fav.id === product.id);
        let updatedFavorites;
        if (isFavorited) {
            updatedFavorites = favorites.filter(fav => fav.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

const handleAddProduct = (product) => {
    const { id, product_name, price, quantity } = product;
    const updatedAdded = [...added];
    const existingProductIndex = updatedAdded.findIndex((add) => add.id === id);
    
    if (existingProductIndex > -1) {
        updatedAdded[existingProductIndex].quantity += 1;
    } else {
        updatedAdded.push({ id, product_name, price, quantity: 1 });
    }

    setAdded(updatedAdded);
    localStorage.setItem('added', JSON.stringify(updatedAdded));
};

   
    const removeFavorite = (productId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };


    return (
        <div className='productList'>
            <div className='productList-area'>
                <div className='productPage-list'>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <a href={`/productInfo/${product.id}`}>
                                <img
                                    className='productPage-img'
                                    src={`http://localhost:3001${product.productImage}`}
                                    alt={product.product_name} 
                                    style={{ width: '300px', height: '400px' }} 
                                />
                                </a>
                                <div className='product-data'>
                                    <p>{product.product_name}</p>
                                    <p> ${product.price} USD</p>
                                    <p>{product.category?.category_name}</p>
                                    <p>{product.stock} left in stock</p>
                                </div>
                                <div className='actions'>
                                    <button id='productPage-del' className='button' onClick={() => handleProductDelete(product.id)}><i className="bi bi-trash3"></i></button>
                                    <button
                                        id='productPage-favorite'
                                        onClick={() => handleFavoriteProduct(product)} 
                                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <i className={`bi ${favorites.some(fav => fav.id === product.id) ? 'bi-heart-fill' : 'bi-heart'}`} 
                                            style={{ color: 'red', fontSize: '1.5em' }}></i>
                                    </button>
                                    <div className='edit-area'>
                                        <Link id="edit-btn" to={`/products/${product.id}`}><i className="bi bi-pencil-square"></i></Link>
                                    </div>
                                    <button id='product-addCart' className='button' onClick={() => handleAddProduct({ id: product.id, product_name: product.product_name, price: product.price, quantity: product.quantity })}>
                                    Add to Cart
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
    );
}

