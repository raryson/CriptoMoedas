const express = require('express')
const userMongoose = require('../routes/user')
const asyncHandler = require('express-async-handler')
const fetch = require('node-fetch')

const router = express.Router()

router.get('/:guid', asyncHandler (async (req, res) => {
 
    const user = await userMongoose.GetUserByGuid(req.params.guid)
    const valuesOfBTC = await getValuesOfBTC()
    const avarageOfBTCValue = (parseInt(valuesOfBTC.ticker.high) + parseInt(valuesOfBTC.ticker.low))/2 

    res.json( {'User': user, 'Value of criptoCoins on bitcoins': user.criptoCoins * avarageOfBTCValue, 'All values of bitcoins' : valuesOfBTC})
}))

router.post('/',asyncHandler( async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    res.json(await userMongoose.CreateWallet(req.body.name, req.body.criptoCoins))
    
}))

const getValuesOfBTC  = async () => {
    try {
        const response =  await fetch("https://www.mercadobitcoin.net/api/BTC/ticker/")
        const json = await response.json()
        return json
    } catch (error) {
        throw error
    }
}

module.exports = router;
