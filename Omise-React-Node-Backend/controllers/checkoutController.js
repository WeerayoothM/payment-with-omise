let omise = require('omise')({
    'publicKey': process.env.OMISE_PUBLIC_KEY,
    'secretKey': process.env.OMISE_SECRET_KEY,
});
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const rootDir = require('../helper/path')

const filePath = path.join(rootDir, 'data', 'internetBankingCharge.json')

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
exports.checkoutInternetBanking = async (req, res, next) => {

    const { amount, token } = req.body
    try {
        const charge = await omise.charges.create({
            amount,
            'source': token,
            'currency': 'thb',
            'return_uri': 'http://localhost:3000/message',
        });
        console.log(charge)

        res.status(201).send({ authorize_uri: charge.authorize_uri })
    } catch (err) { console.log(err) }

    next()
}

exports.omiseWebHooks = async (req, res, next) => {
    try {
        const { data, key } = req.body;
        console.log(req.body)
        if (key === 'charge.complete') {
            if (data.status === 'successful' || data.status === 'failed') {
                const charge = {
                    id: data.id,
                    status: data.status,
                    amount: data.funding_amount
                }
                console.log(1)

                await writeFile(filePath, JSON.stringify(charge))
            }
        }
    } catch (err) {
        console.log(err)
    }

    next()
}


const readFileData = async () => {
    try {
        const chargeData = await readFile(filePath, 'utf8')
        console.log(2)
        console.log('chargeData', chargeData)
        if (!chargeData) {
            return {}
        }

        return JSON.parse(chargeData)
    } catch (err) {
        console.log(err)
    }
}

exports.getInternetBankingCharge = async (req, res, next) => {
    try {
        const charge = await readFileData()
        console.log(3)

        console.log(charge)
        res.send({ ...charge })
        await writeFile(filePath, JSON.stringify({}))
    } catch (err) {
        console.log(err)
    }
    next()
};