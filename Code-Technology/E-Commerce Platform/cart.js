const express = require('express');
const authenticateJWT = require('../middleware/auth');
const Order = require('../models/Order');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const router = express.Router();

// Checkout with Stripe
router.post('/checkout', authenticateJWT, async (req, res) => {
  const {products, total} = req.body;
  // Stripe call
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: products.map(p => ({
      price_data: {
        currency: 'usd',
        product_data: {name: p.name},
        unit_amount: p.price * 100,
      },
      quantity: p.quantity,
    })),
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cart',
  });
  const order = new Order({user: req.user.id, products, total, paid: false});
  await order.save();
  res.json({url: session.url});
});
module.exports = router;
