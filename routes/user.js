const mongoose = require('mongoose')
const mongoUserName = process.env.mongoUserName
const mongoUserPassword = process.env.mongoUserPassword

mongoose.connect(`mongodb://${mongoUserName}:${mongoUserPassword}@ds221242.mlab.com:21242/criptomoedas`)

const User = mongoose.model('User', { name: String, guid: String, criptoMoedas: Number})

module.exports = { User }