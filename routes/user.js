const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')

const mongoUserName = process.env.mongoUserName
const mongoUserPassword = process.env.mongoUserPassword

const User = mongoose.model('User', 
{ name: String, guid: String, criptoCoins: Number, transactions:[String]})

const CreateConnection = () => {
    mongoose.connect(`mongodb://${mongoUserName}:${mongoUserPassword}@ds221242.mlab.com:21242/criptomoedas`)
}

const CreateWallet = (name, criptoCoins) => {
    CreateConnection()
    return new User({ name: name, guid: uuidv1(), criptoCoins: criptoCoins, 
        transactions: [`Wallet is created, ${new Date().toLocaleString()}`]}).save()
}

const GetUserByGuid = (guid) => {
    CreateConnection()
    return User.findOne({"guid":guid}).exec().catch((err) => {throw err})
}

const UpdateUserByGuid = (guid, userInfos) => {
    CreateConnection()
   return User.findOneAndUpdate({"guid":guid}, userInfos)
}

const AddCryptoCoinsToUser = (criptoCoins, user) => 
{
    user.criptoCoins += parseInt(criptoCoins)
    user.transactions.push(`Receive a transfer from ${user.guid} with value of ${criptoCoins} criptoCoins, ${new Date().toLocaleString()}`)
    return { criptoCoins : user.criptoCoins, transactions : user.transactions} 
}

const DiscountCryptocoinsFromUser = (criptoCoins, user) =>
{
    user.criptoCoins -= parseInt(criptoCoins)
    user.transactions.push(`Made a transfer to ${user.guid} with value of ${criptoCoins} criptoCoins, ${new Date().toLocaleString()}`)
    return { criptoCoins : user.criptoCoins, transactions : user.transactions}
}

module.exports = { User, AddCryptoCoinsToUser, DiscountCryptocoinsFromUser, GetUserByGuid, UpdateUserByGuid, CreateWallet }