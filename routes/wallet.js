const express = require('express')
const userMongoose = require('../models/user')
const asyncHandler = require('express-async-handler')
const bitcoins = require('../models/bitcoins')

const router = express.Router()

router.get('/:guid', asyncHandler (async (req, res) => {
    const user = await userMongoose.GetUserByGuid(req.params.guid)
    const valuesOfBTC = await bitcoins.GetValuesOfBTC()
    const avarageOfBTCValue = (parseInt(valuesOfBTC.ticker.high) + parseInt(valuesOfBTC.ticker.low))/2 

    res.json( {'User': user, 'Value of criptoCoins on bitcoins': user.criptoCoins * avarageOfBTCValue, 'All values of bitcoins' : valuesOfBTC})
}))

router.post('/',asyncHandler( async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    res.json(await userMongoose.CreateWallet(req.body.name, req.body.criptoCoins))
    
}))



module.exports = router;
