const {Router} = require('express')
const {Key} = require('../models')
const crypto = require('crypto')
const constants = require('constants')
const fs = require('fs')

const router = Router()

router.get('/', (req,res) => res.send('this is key page'))

router.post('/publickey', (req,res) => {
	Key.findOne({publicKey: req.body.publicKey})
	.then((data) => {
		if(!data){
			const padding = crypto.randomBytes(10)

			const newKey = new Key()
			newKey.publicKey = req.body.publicKey
			newKey.padding = padding

			newKey.save()
			.then((data) => {
				const plain = fs.readFileSync('./file.txt', 'utf8')
				let plainBuf = Buffer.from(plain)
				const padding = Buffer.from(data.padding)
				plainBuf = Buffer.concat([plainBuf, padding], 256)

				const cipher = crypto.publicEncrypt({"key": data.publicKey, padding: constants.RSA_NO_PADDING}, plainBuf)
				res.send(cipher)
			})
			.catch((error) => console.log(error))
		}
		else {
			res.status(409).send('this key has been used')
		}
	})
})

module.exports = router
