const {Router} = require('express')
const axios = require('axios')

const router = Router()

router.get('/', (req,res) => res.send('subjects~~'))

router.get('/:subjectId', (req, res) => {
	console.log('state', req.headers.state)
	if(req.headers.state !== undefined){
		const isTrue = (req.headers.state == 'true')
		if(isTrue){
			res.send({success: true})
		}
		else{
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

module.exports = router
