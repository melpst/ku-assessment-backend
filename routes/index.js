const {Router} = require('express')
const key = require('./key')

const router = Router()

router.use('/key', key)

router.get('/', (req,res) => res.send('hello, world'))

router.get('/cipher', (req, res) => {
	res.send({cipher : 'cipher'})
})

module.exports = router
