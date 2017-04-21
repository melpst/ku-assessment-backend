const {Router} = require('express')
const axios = require('axios')

const router = Router()

router.get('/', (req,res) => res.send('subjects~~'))

router.get('/:subjectId', (req, res) => {
	const isTrue = (req.headers.state == 'true')
	if(isTrue){
		res.send({success: true})
	}
	else{
		console.log('state', req.headers.state)
		axios.get('http://localhost:4000/cipher')
		.then((response) => {
			res.send(response.data)
		})
	}
})

module.exports = router
