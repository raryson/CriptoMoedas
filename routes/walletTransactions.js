const express = require('express')
const asyncHandler = require('express-async-handler')
const MongoUser = require('../routes/user')

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    let fromGuidUser =  await GetUserByGuid(req.body.fromGuid)
    let toGuidUser =   await GetUserByGuid(req.body.toGuid)

    fromGuidUser.criptoMoedas -= parseInt(req.body.quantity)
    let infoFromUpdate = {criptoMoedas: fromGuidUser.criptoMoedas}

    toGuidUser.criptoMoedas += parseInt(req.body.quantity)
    let infoToUpdate = {criptoMoedas: toGuidUser.criptoMoedas}

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
