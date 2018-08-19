const express = require('express')
const asyncHandler = require('express-async-handler')
const MongoUser = require('../routes/user')

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    const fromGuidUser =  await GetUserByGuid(req.body.fromGuid)
    const toGuidUser =   await GetUserByGuid(req.body.toGuid)

    fromGuidUser.criptoCoins -= parseInt(req.body.quantity)
    fromGuidUser.transactions.push(`Made a transfer to ${toGuidUser.guid} with value of ${req.body.quantity} criptoCoins, ${new Date().toLocaleString()}`)
    const infoFromUpdate = {criptoCoins: fromGuidUser.criptoCoins, transactions: fromGuidUser.transactions}

    toGuidUser.criptoCoins += parseInt(req.body.quantity)
    toGuidUser.transactions.push(`Receive a transfer from ${fromGuidUser.guid} with value of ${req.body.quantity} criptoCoins, ${new Date().toLocaleString()}`)
    const infoToUpdate = {criptoCoins: toGuidUser.criptoCoins, transactions: toGuidUser.transactions}

    await UpdateUserByGuid(fromGuidUser.guid, infoFromUpdate)
    await UpdateUserByGuid(toGuidUser.guid, infoToUpdate)

    res.json("ok")

}))

const GetUserByGuid = (guid) => {
     return MongoUser.User.findOne({"guid":guid}).exec().catch((err) => {throw err})
}

const UpdateUserByGuid = (guid, userInfos) => {
    return MongoUser.User.findOneAndUpdate({"guid":guid}, userInfos)
}



module.exports = router;
