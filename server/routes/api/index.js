const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');
const checkoutRoutes = require('./checkout-route');
const userRoutes = require('./user-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/users', userRoutes);

module.exports = router;