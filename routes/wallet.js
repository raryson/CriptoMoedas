const express = require('express')
const uuidv1 = require('uuid/v1')
const MongoUser = require('../routes/user')

const router = express.Router()

router.get('/:guid', (req, res) => {
    MongoUser.User.findOne({"guid": req.params.guid},(err, user) => {
            if(err) throw err
            res.json(user)
        })
    })

router.post('/', (req, res) => {
    //VOU FINGIR QUE TEM VALIDACAO DOS DADOS QUE ENTRAM, BLZ?
    const creatingUser = new MongoUser.User({ name: req.body.name, guid: uuidv1(), criptoMoedas: req.body.criptoMoedas })
    creatingUser.save().then(() => res.json(creatingUser))
})


module.exports = router;
