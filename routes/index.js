const {Router} = require('express')
const axios = require('axios')
const fs = require('fs')
const {Key, Cipher} = require('../models')
const key = require('./key')
const subjects = require('./subjects')

const router = Router()

router.use('/key', key)
router.use('/subjects', subjects)

router.get('/', (req,res) => res.send('hello, world'))

router.get('/auth', (req, res) => {
	console.log('state', req.headers.state)
	if(req.headers.state !== undefined){
		const isTrue = (req.headers.state == 'true')
		if(isTrue){
			res.send({success: true})
		}
		else{
			console.log('state == false')
			axios.get('http://localhost:4000/cipher')
			.then((response) => {
				res.send(response.data)
			})
		}
	}
	else{
		res.send('you should auth first')
	}
})

router.get('/cipher', (req, res) => {
	Cipher.find()
	.then((data) => {
		res.send(data)
	})
})

router.post('/checkword', (req, res) => {
	const plain = fs.readFileSync('./file.txt', 'utf8')
	if(plain === req.body.word){
		axios.get('http://localhost:4000/key/publickey')
		.then((response) => {
			res.send(response.data)
		})
	}
	else{
		res.send({success: false})
	}
})


module.exports = router
