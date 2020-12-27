let omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
});

exports.checkoutCreditCard = async (req, res, next) => {

    const { email, amount, name, token } = req.body
    try {
        const customer = await omise.customers.create({
            email,
            'description': name,
            'card': token,
        });

        const charge = await omise.charges.create({
            amount,
            'currency': 'thb',
            'customer': customer.id,
        });
        console.log(charge)
        res.status(201).send({ amount: charge.amount, status: charge.status })
    } catch (err) { console.log(err) }

    next()
}