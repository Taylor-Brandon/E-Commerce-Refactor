import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [favorites, setFavorites] = useState([]);
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

   
    const removeFavorite = (productId) => {
        const updatedFavorites = favorites.filter(fav => fav.id !== productId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <h2>Products</h2>
            <h2>Favorited products: {favorites.length}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product_name}, ${product.price}, {product.category?.category_name}
                        <button 
                            className='button' 
                            onClick={() => handleProductDelete(product.id)}
                        >
                            Delete
                        </button>
                        <button 
                            className='button' 
                            onClick={() => handleFavoriteProduct(product)}
                        >
                            {favorites.some(fav => fav.id === product.id) ? 'Unfavorite' : 'Favorite'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
