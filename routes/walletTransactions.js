const express = require('express')
const asyncHandler = require('express-async-handler')
const user = require('../models/user')

const router = express.Router()

router.post('/', asyncHandler(async (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    try
    {
        user.MakeTransactionsBetweenTwoWallets(req.body.fromGuid, req.body.toGuid, req.body.quantity)
        res.json("ok")
    }
    catch(ex)
    {
        throw ex
    }
    
}))

module.exports = router;
