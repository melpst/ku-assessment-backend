const {Router} = require('express')
const {Key, Cipher} = require('../models')
const constants = require('constants')
const crypto = require('crypto')
const axios = require('axios')
const fs = require('fs')

const router = Router()

router.get('/', (req,res) => res.send('this is key page'))

router.get('/publicKey', (req,res) => {
	Key.find()
	.then((data) => {
		res.send(data)
	})
	.catch((error) => res.send({success: false}))
})

router.post('/publickey', (req,res) => {
	const plain = fs.readFileSync('./file.txt', 'utf8')
	let plainBuf = Buffer.from(plain)
	Key.findOne({publicKey: req.body.publicKey})
	.then((data) => {
		if(!data){
			const paddingLength = 256-plain.length
			const padding = crypto.randomBytes(paddingLength)

			const newKey = new Key()
			newKey.publicKey = req.body.publicKey
			newKey.padding = padding

			newKey.save()
			.then((data) => {
				
				const padding = Buffer.from(data.padding)
				plainBuf = Buffer.concat([plainBuf, padding], 256)
				const cipher = crypto.publicEncrypt({"key": data.publicKey, padding: constants.RSA_NO_PADDING}, plainBuf)

				const newCipher = new Cipher() 
				newCipher._id = data._id
				newCipher.cipher = cipher.toString('hex')

				newCipher.save()
				.then((data) => {
					res.send(data._id)
				})
			})
			.catch((error) => console.log(error))
		}
		else {
			res.status(409).send('this key has been used')
		}
	})
})

module.exports = router
