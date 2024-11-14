import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/nav';
import api from '../utils/api';

export default function ProductInfo() {
    const { productId } = useParams();
    const [favorites, setFavorites] = useState([]);
    const [added, setAdded] = useState([]);
    const [productData, setProductData] = useState({
        id: '', 
        product_name: '',
        price: '',
        stock: '',
        productImage: '',
        category_id: '',
        tagIds: [],
    });

    useEffect(() => {
        api.get(`/products/${productId}`)
            .then((response) => {
                setProductData({
                    id: response.data.id, 
                    product_name: response.data.product_name,
                    price: response.data.price,
                    stock: response.data.stock,
                    productImage: response.data.productImage,
                    category_id: response.data.category_id,
                    tagIds: response.data.tagIds || [],
                });
            })
            .catch((err) => {
                console.error(err);
            });

       
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
        setAdded(JSON.parse(localStorage.getItem('added')) || []);
    }, [productId]);

    const handleFavoriteProduct = () => {
        const isFavorited = favorites.some(fav => fav.id === productData.id);
        let updatedFavorites;
        if (isFavorited) {
            updatedFavorites = favorites.filter(fav => fav.id !== productData.id);
        } else {
            updatedFavorites = [...favorites, productData];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleAddProduct = () => {
        const updatedAdded = [...added];
        const existingProductIndex = updatedAdded.findIndex(add => add.id === productData.id);

        if (existingProductIndex > -1) {
            updatedAdded[existingProductIndex].quantity += 1;
        } else {
            updatedAdded.push({ id: productData.id, quantity: 1 });
        }

        setAdded(updatedAdded);
        localStorage.setItem('added', JSON.stringify(updatedAdded));
    };

    return (
        <div>
            <Nav />
        <div className='productData-area'>
            <div className='cart-area'>
                <p id='cart-icon'><i className="bi bi-cart"></i></p>
                <p id='cart-length'>{added.length}</p>
            </div>
            <div className='product-information'>
                <div className='product-text'>
                    <h2 id='productData-header'>{productData.product_name}</h2>
                    <button
                        id='favorite'
                        onClick={handleFavoriteProduct}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <i className={`bi ${favorites.some(fav => fav.id === productData.id) ? 'bi-heart-fill' : 'bi-heart'}`} 
                           style={{ color: 'red', fontSize: '1.5em' }}></i>
                    </button>
                    <p id='price'>${productData.price} USD</p>
                    <p id='stock'>{productData.stock} left in stock</p>
                    <button id='add-product' className='button' onClick={handleAddProduct}>
                        Add to cart
                    </button>
                </div>
            </div>
            <div className='img-container'>
                <img
                    id='productData-img'
                    src={`http://localhost:3001${productData.productImage}`}
                    alt={productData.product_name}
                    style={{ width: '400px', height: '550px' }}
                />
            </div>
        </div>
        </div>
    );
}
