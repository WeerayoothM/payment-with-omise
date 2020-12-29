const express = require('express');
const route = express.Router();

const checkoutControllers = require('../controllers/checkoutController')

route.post('/checkout-credit-card', checkoutControllers.checkoutCreditCard);
route.post('/checkout-internet-banking', checkoutControllers.checkoutInternetBanking);
route.post('/webhooks', checkoutControllers.omiseWebHooks) //* ให้ทาง Omise ส่ง post request มาที่ route นี้
route.get('/bank-charges', checkoutControllers.getInternetBankingCharge)

module.exports = route