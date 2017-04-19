const {Router} = require('express')
const {Key} = require('../models')

const router = Router()

router.get('/', (req,res) => res.send('this is key page'))

router.post('/publickey', (req,res) => {
	Key.findOne({publicKey: req.body.publicKey})
	.then((data) => {
		if(!data){
			const newKey = new Key()
			newKey.publicKey = req.body.publicKey
			newKey.padding = 'padding'

			newKey.save()
			.then((data) => res.status(201).send(data))
			.catch((error) => console.log(error))
		}
		else {
			res.status(409).send('this key has been used')
		}
	})
})

module.exports = router
