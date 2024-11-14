import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Checkout({ cartProducts }) {
    const [error, setError] = useState('');
    const [publishableKey, setPublishableKey] = useState(''); 

    
    useEffect(() => {
        api.get('checkout/config')
            .then((response) => {
                setPublishableKey(response.data.publishableKey); 
            })
            .catch((error) => {
                console.error('Error fetching publishable key:', error);
                setError('Could not fetch payment configuration.');
            });
    }, []); 
    const handleButtonResponse = () => {
        console.log('Cart products:', cartProducts); 
        api.post('/checkout', { items: cartProducts })
            .then((response) => {
                const { id } = response.data;
                if (publishableKey) {
                    const stripe = window.Stripe(publishableKey); 
                    stripe.redirectToCheckout({ sessionId: id })
                        .then((result) => {
                            if (result.error) {
                                setError(result.error.message);
                            }
                        });
                } else {
                    setError('Stripe key is not available.');
                }
            })
            .catch((error) => {
                console.error('Checkout error:', error);
                setError('Could not checkout. Please try again.');
            });
    };
    return (
        <div>
            <button className='button is-primary' onClick={handleButtonResponse}>Checkout</button>
        </div>
    );
}


