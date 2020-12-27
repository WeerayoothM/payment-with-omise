const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const checkoutRoute = require('./routes/checkoutRoutes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.use('/', checkoutRoute)

app.listen(8000, () => {
  console.log('Server is up')
})
