const express = require('express')
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')

const router = express.Router()
const mongoUserName = process.env.mongoUserName
const mongoUserPassword = process.env.mongoUserPassword

mongoose.connect(`mongodb://${mongoUserName}:${mongoUserPassword}@ds221242.mlab.com:21242/criptomoedas`)
    
const User = mongoose.model('User', { name: String, guid: String, criptoMoedas: Number})

router.get('/:guid', (req, res) => {
    User.findOne({"guid": req.params.guid},(err, user) => { 
            res.json(user);
        })
    })

router.post('/', (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    const creatingUser = new User({ name: req.body.name, guid: uuidv1(), criptoMoedas: req.body.criptoMoedas })
    creatingUser.save().then(() => res.json(creatingUser))
})


module.exports = router;
