const {Router} = require('express')

const router = Router()

router.get('/', (req,res) => res.send('this is key page'))

router.post('/publickey', (req,res) => {
	res.send(req.body.publicKey)
})

module.exports = router
