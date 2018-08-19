const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD

const User = mongoose.model('User', 
{ name: String, guid: String, criptoCoins: Number, transactions:[String]})

const CreateConnection = () => {
    try
    {
        return mongoose.connect(`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ds221242.mlab.com:21242/criptomoedas`, { useNewUrlParser: true })
    }
    catch(ex)
    {
        return ex
    }
    
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

const MakeTransactionsBetweenTwoWallets = async (fromGuid, toGuid, quantity) => {
    const fromGuidUser =  await GetUserByGuid(fromGuid)
    const toGuidUser =   await GetUserByGuid(toGuid)

    const infoFromUpdate = DiscountCryptocoinsFromUser(quantity, fromGuidUser)
    const infoToUpdate = AddCryptoCoinsToUser(quantity, toGuidUser)

    await UpdateUserByGuid(fromGuid, infoFromUpdate)
    await UpdateUserByGuid(toGuid, infoToUpdate)
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

module.exports = { User, AddCryptoCoinsToUser, DiscountCryptocoinsFromUser, GetUserByGuid, UpdateUserByGuid, CreateWallet, CreateConnection, MakeTransactionsBetweenTwoWallets }