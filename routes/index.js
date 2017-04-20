const {Router} = require('express')
const axios = require('axios')
const {Key, Cipher} = require('../models')
const key = require('./key')
const subjects = require('./subjects')

const router = Router()

router.use('/key', key)
router.use('/subjects', subjects)

router.get('/', (req,res) => res.send('hello, world'))

router.get('/cipher', (req, res) => {
	console.log('/cipher')
	Cipher.find()
	.then((data) => {
		res.send(data)
	})
})

module.exports = router
