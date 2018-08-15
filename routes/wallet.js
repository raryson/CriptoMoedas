const express = require('express')
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')

const router = express.Router()
const mongoUserName = process.env.mongoUserName
const mongoUserPassword = process.env.mongoUserPassword

const UserModel = new mongoose.Schema({ name: String, guid: String, criptoMoedas: Number})
const User = mongoose.model('User', UserModel)

router.get('/:guid', (req, res) => {
    console.log("AAA")
    User.findOne({ 'name': 'Raryson'}, (err, user) => { 
        console.log("bbb")
            res.json(user);
        })
    })

router.post('/', (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    mongoose.connect(`mongodb://${mongoUserName}:${mongoUserPassword}@ds221242.mlab.com:21242/criptomoedas`)
    
    const creatingUser = new User({ name: req.body.name, guid: uuidv1(), criptoMoedas: req.body.criptoMoedas })
    
    creatingUser.save().then(() => res.json(creatingUser))
})


module.exports = router;
