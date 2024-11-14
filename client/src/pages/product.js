import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/productList';
import Nav from '../components/nav';
import Cart from '../components/cart';
import SearchProducts from '../components/searchProducts';

export default function Product() { 
    const [favorites, setFavorites] = useState([]);
    const [added, setAdded] = useState([]);
    const [isFavoritesVisible, setIsFavoritesVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        const storedProducts = JSON.parse(localStorage.getItem('added')) || [];
        setAdded(storedProducts);
    }, []);
    const toggleFavoritesModal = () => {
        setIsFavoritesVisible(!isFavoritesVisible);
    };

    const toggleCartModal = () => {
        setIsCartVisible(!isCartVisible);
    };




    return (
        <div>
            <Nav/>
            <div className='productSearch-area'>
            <div className='search'>
            <SearchProducts />
            </div>
            </div>
            <div className='fav-area'>
                <div className='cart-area'>
                <button id='cart-btn' className='button' onClick={toggleCartModal}><i className="bi bi-cart"></i></button>
                {isCartVisible && <Cart added={added} toggle={toggleCartModal}/>}
                </div>
                <button id='fav-products' className='button' onClick={toggleFavoritesModal}><i className='bi-heart-fill'></i></button>
                {isFavoritesVisible && (
                    <div className='modal is-active'>
                         <div className="modal-background" onClick={toggleFavoritesModal}></div>
                         <div className='modal-card'>
                            <header className="modal-card-head">
                                <h1 id='fav-header' class="modal-card-title">Your Favorites</h1>
                                <button className="delete" aria-label="close" onClick={toggleFavoritesModal}></button>
                            </header>
                            <section className="modal-card-body">
                            <ul>
                            {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        <a id='fav-link' href={`/productInfo/${favorite.id}`}>
                        <p>{favorite.product_name} - {favorite.price} USD</p>
                                </a>
                    </li>
                ))}
            </ul>
                            </section>
                         </div>
                         </div>
                )}
                </div>
                <div className='add-area'>
                <Link id='add-btn' to='/productForm'><i className="bi bi-plus-lg"></i></Link>
                </div>
            <ProductList />
        </div>
    );
}
