const express = require('express')
const asyncHandler = require('express-async-handler')
const user = require('./user')

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    const fromGuidUser =  await user.GetUserByGuid(req.body.fromGuid)
    const toGuidUser =   await user.GetUserByGuid(req.body.toGuid)

    const infoFromUpdate = user.DiscountCryptocoinsFromUser(req.body.quantity, fromGuidUser)
    const infoToUpdate = user.AddCryptoCoinsToUser(req.body.quantity, toGuidUser)

    await user.UpdateUserByGuid(fromGuidUser.guid, infoFromUpdate)
    await user.UpdateUserByGuid(toGuidUser.guid, infoToUpdate)

    res.json("ok")

}))

module.exports = router;
