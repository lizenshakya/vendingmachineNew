const express = require('express');
const router = express.Router();

const productController = require('./product.controller');


router.get('/', productController.getProducts);
router.post('/checkout', productController.buyProducts);
router.post('/refund', productController.refundItems);
module.exports = router;