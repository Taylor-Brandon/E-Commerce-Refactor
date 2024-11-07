const express = require('express');
const { Product } = require('../../models');
const Stripe = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body.items);

    const lineItems = await Promise.all(
      req.body.items.map(async (item) => {
        const productItem = await Product.findByPk(item.id); 

        if (!productItem) {
          console.error(`Product with ID ${item.id} not found`);
          throw new Error(`Product with ID ${item.id} not found`);
        }

        console.log('Product found:', productItem);

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: productItem.product_name,
            },
            unit_amount: productItem.price * 100, 
          },
          quantity: item.quantity,
        };
      })
    );

    console.log('Line Items:', lineItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.SERVER_URL}/products/success`,
      cancel_url: `${process.env.SERVER_URL}/products/cancel`,
    });

    console.log('Stripe session created:', session);

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error.message || error);
    res.status(500).json({ message: 'Error checking out product on server.' });
  }
});

// Endpoint to fetch publishable key
router.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY, // Load the publishable key
  });
});

module.exports = router;

  


