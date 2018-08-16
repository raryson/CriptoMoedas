const express = require('express')
const uuidv1 = require('uuid/v1')
const MongoUser = require('../routes/user')

const router = express.Router()

router.post('/', (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    MongoUser.User.findOne({"guid": req.body.fromGuid}, (err, user) => {
        if(err) throw err
        let fromUserObject = new MongoUser.User(user)

        MongoUser.User.findOne({"guid": req.body.toGuid}, (err, user) => {
            if(err) throw err
            let toUserObject = new MongoUser.User(user)

            fromUserObject.criptoMoedas -= req.body.quantity
            toUserObject.criptoMoedas += req.body.quantity

            MongoUser.User.findOneAndUpdate({"guid": fromUserObject.guid},{fromUserObject},(err) => {
                if(err) throw err
            })

            MongoUser.User.findOneAndUpdate({"guid": toUserObject.guid},{toUserObject},(err) => {
                if(err) throw err
            })
        })
    })

    res.json("ok")

})



module.exports = router;
