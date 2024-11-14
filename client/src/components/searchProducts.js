import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function SearchProducts() {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); 

    useEffect(() => {
        api.get('/products')
            .then((response) => {
                setProducts(response.data);
                setFilteredProducts(response.data); 
            })
            .catch((error) => {
                console.error('Error Fetching Products!', error);
            });
    }, []);

    const handleChange = (event) => {
        const searchInput = event.target.value;
        setSearch(searchInput);
        const filtered = products.filter((product) => {
            return (
                product.product_name.toLowerCase().includes(searchInput.toLowerCase()) ||
                product.price.toString().includes(searchInput) ||
                (product.category && product.category.category_name.toLowerCase().includes(searchInput.toLowerCase()))
            );
        });
        setFilteredProducts(filtered);
        setVisible(true);
    };

    return (
        <div div className='search-form'>
            <div className="form">
                <form className="field" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-control">
                        <input
                            className="input"
                            type="text"
                            value={search}
                            onChange={handleChange}
                            placeholder="Search"
                        />
                    </div>
                </form>
                <button id="search-product" className="button" type="submit">
                    Search
                </button>
            </div>

            {visible && (
            <div>
            {filteredProducts.length === 0 ? (
                <p id="noProduct-result">No results found</p>
            ) : (
                <div>
                    <div id="searchProduct-list">
                    <ul id="product-results">
                        {filteredProducts.map((product) => (
                            <li id="indiv-product" key={product.id}>
                                <a href={`/productInfo/${product.id}`}>
                                {product.product_name} - ${product.price}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            )}
            </div>
            )}
        </div>
    );
}
