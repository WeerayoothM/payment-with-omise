const express = require('express');
const route = express.Router();

const checkoutControllers = require('../controllers/checkoutController')

route.post('/checkout-credit-card', checkoutControllers.checkoutCreditCard);
route.post('/checkout-internet-banking', checkoutControllers.checkoutInternetBanking);

module.exports = route