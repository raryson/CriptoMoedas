const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const wallet = require('./routes/wallet')
const walletTransactions = require('./routes/walletTransactions')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/v1/wallet', wallet)
app.use('/api/v1/walletTransactions', walletTransactions)

module.exports = app
