const express = require('express')
const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1')

const router = express.Router()

const User = mongoose.model('User', { name: String, guid: String, criptoMoedas: Number})

router.get('/:guid', (req, res) => {
    User.findOne({ guid: req.params.guid},(
        (err, user) => {

            // if(err) throw err;
    
            res.json(user);
        }))
})

router.post('/', (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    mongoose.connect('mongodb://raryson:123456a@ds221242.mlab.com:21242/criptomoedas')
    
    const creatingUser = new User({ name: req.body.name, guid: uuidv1(), criptoMoedas: req.body.criptoMoedas })
    
    creatingUser.save().then(() => res.json(creatingUser))
})


module.exports = router;
