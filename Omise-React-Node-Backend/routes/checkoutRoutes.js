const express = require('express');
const route = express.Router();

const checkoutControllers = require('../controllers/checkoutController')

route.post('/checkout-credit-card', checkoutControllers.checkoutCreditCard);

module.exports = route